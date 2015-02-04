/*jslint node: true */
'use strict';

var async = require('async'),
    qs = require('querystring'),
    request = require("request"),
    config = require('../../config'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    UserModel = require('./users.model'),
    q = require('q');

module.exports.facebook = facebook;
module.exports.google = google;
module.exports.getUser = getUser;
module.exports.modifyUser = modifyUser;
module.exports.register = register;
module.exports.login = login;
module.exports.me = me;
module.exports.updateMe = updateMe;
module.exports.ensureAuthenticated = ensureAuthenticated;
module.exports.decodeUserId = decodeUserId;

function register(req, res) {
  processRegisterOrSocialLogin(null, req, res, {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
}

function me(req, res) {
  UserModel.findById(req.userId).exec()
  .then(function (user) {
    res.send({data: user});
  });
}

function updateMe(req, res) {
  //TODO : check id from token
  //TODO: use findAndUpdate
  UserModel.findById(req.user._id, function (err, user) {
    if (!user) {
      return res.status(500).send({error: 'User not found'});
    }
    //TODO : add field
    user.email = req.body.email || user.email;
    user.save(function (err) {
      res.status(200).end();
    });
  });
}

function login(req, res) {
  UserModel.findOne({email: req.body.email}, '+hashedPassword +salt').exec()
  .then(function (user) {
    if (!user || !user.authenticate(req.body.password)) {
      return res.status(500).send({error: 'Wrong email and/or password'});
    }
    res.status(200).send({token: createToken(user)});
  }, function(err) {
    res.status(500).send({error: err});
  });
}

function getUser(req, res) {

}

function modifyUser(req, res) {

}

function facebook(req, res) {
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.auth.facebook.clientId,
    redirect_uri: req.body.redirectUri
  };

  async.waterfall([
    function (callback) {
      request.get({url: config.auth.facebook.accessTokenUrl, qs: params, json: true},
          function (err, resp, accessToken) {
            callback(err, accessToken);
          });
    },
    function (accessToken, callback) {
      accessToken = qs.parse(accessToken);
      request.get({url: config.auth.facebook.graphApiUrl, qs: accessToken, json: true},
          function (err, resp, profile) {
            callback(err, profile);
          });
    }
  ], function (err, profile) {
    //TODO: add error catch
    processRegisterOrSocialLogin(err, req, res, profile, 'facebook', profile.id);
  });
}

function google(req, res) {
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.auth.google.secret,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  async.waterfall([
    function (callback) {
      request.post({url: config.auth.google.accessTokenUrl, json: true, form: params},
          function (err, resp, accessToken) {
            callback(err, accessToken);
          });
    },
    function (accessToken, callback) {
      accessToken = accessToken.access_token;
      var headers = {Authorization: 'Bearer ' + accessToken};

      request.get({url: config.auth.google.peopleApiUrl, headers: headers, json: true},
          function (err, resp, profile) {
            callback(err, profile);
          });
    }
  ], function (err, profile) {
    //TODO: add error catch
    processRegisterOrSocialLogin(err, req, res, profile, 'google', profile.sub);
  });
}

function processRegisterOrSocialLogin(err, req, res, profile, provider, providerId) {


  UserModel.findByEmailOrSocials(profile.email, provider, providerId)
    .then(function (user) {
      if (user && provider) {
        return updateProfileSocialId(user, profile, provider, providerId);
      }

      var newUser = new UserModel({
        username: profile.username,
        name: profile.name,
        email: profile.email,
        password: profile.password,
        avatar: profile.picture || ''
      });
      newUser[provider] = {id: providerId};
      
      var defer = q.defer();
      newUser.save(function(err, user) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(user);
        }
      });
      return defer.promise;
    })
    .then(function (user) {
      res.status(200).json({token: createToken(user)});
    }, function(err) {
      res.status(500).json({error: err});
    });
}

function updateProfileSocialId(user, profile, provider, providerId) {
  if (user[provider] && user[provider].id.toString() === providerId.toString()) {
    return user;
  }
  var socialProfile = {};
  socialProfile[provider] = {id: providerId};
  return UserModel.findByIdAndUpdate(user.id, {$set: socialProfile}).exec();
}

function createToken(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.tokenSecret);
}


function decodeUserId(req, res, next) {
  if (!req.headers.authorization) {
    return next();
  }
  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, config.tokenSecret);
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({message: 'Token has expired'});
  }
  req.userId = payload.sub;
  next();
}

function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'Please make sure your request has an Authorization header'
    });
  }
  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, config.tokenSecret);
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({message: 'Token has expired'});
  }
  UserModel.findById(payload.sub).exec()
  .then(function (user) {
    req.user = user;
    next();  
  }, function(err) {
    return res.status(500).send({error: 'Wrong email and/or password'});
  });
}
