/*jslint node: true */
'use strict';

var async = require('async'),
    qs = require('querystring'),
    request = require("request"),
    config = require('../../config'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    q = require('q'),
    UserModel = require('./users.model');

module.exports.facebook = facebook;
module.exports.google = google;
module.exports.getUser = getUser;
module.exports.modifyUser = modifyUser;
module.exports.register = register;
module.exports.login = login;
module.exports.restorePassword = restorePassword;
module.exports.isUniqueEmail = isUniqueEmail;
module.exports.me = me;
module.exports.updateMe = updateMe;
module.exports.ensureAuthenticated = ensureAuthenticated;
module.exports.ensureEmailIsConfirmed = ensureEmailIsConfirmed;
module.exports.ensureAdminRole = ensureAdminRole;
module.exports.decodeUserId = decodeUserId;
module.exports.verifyEmail = verifyEmail;

function verifyEmail(req, res) {
  var updateData = {'$set': {isEmailConfirmed: true}};
  UserModel.findOneAndUpdate({emailConfirmToken: req.params.token}, updateData).exec()
  .then(function(user) {
    if (user) {
      res.status(200).render('token_ok');
    } else {
      res.status(200).render('token_not_found');
    }
  });
}

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

function isUniqueEmail(req, res) {
  UserModel.findOne({email: req.body.email}).exec()
    .then(function (user) {
      if (user) {
        res.send({data: true});
      } else {
        res.send({data: false});
      }
    });
}

function updateMe(req, res) {
  //TODO : check id from token
  var userData = req.body.data;
  UserModel.findById(userData._id, '+hashedPassword +salt').exec()
    .then(function(user) {
    var newData = {};
    if (userData.oldPassword) {
      if (!user.authenticate(userData.oldPassword)) {
        return res.status(500).json({error: {message: 'Wrong password'}});
      }
      newData.hashedPassword = user.encryptPassword(userData.newPassword);
    }
    newData.username = userData.username || user.username;
    newData.avatar = userData.avatar || '';
    newData.phone = userData.phone || '';

    UserModel.findOneAndUpdate({_id: user._id}, { $set: newData}, function (err, user) {
      if (err) {
        res.status(500).json({error: err});
      } else {
        res.status(200).json({data: user, success: {message: 'Your profile was updated!'}});
      }
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

function restorePassword(req, res) {
  var data = req.body.restoreData;
  UserModel.findOne({email: data.email}, '+salt').exec()
    .then(function(user) {
    if (!user) {
      return res.status(500).send({error: 'This email is not registered'});
    }
    var password = user.generatePassword();
    var hashedPassword = user.encryptPassword(password);
    UserModel.findOneAndUpdate({_id: user._id}, {hashedPassword: hashedPassword}, function (err, user) {
      res.send({restoreData: password, success: {message: 'On your email will send new password!'}});
    });
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
    var avatar = '//graph.facebook.com/'+profile.id+'/picture';
    processRegisterOrSocialLogin(
      err, req, res, profile, 'facebook', profile.id, avatar
    );
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
    processRegisterOrSocialLogin(
      err, req, res, profile, 'google', profile.sub, profile.picture
    );
  });
}

function processRegisterOrSocialLogin(err, req, res, profile, provider, providerId, avatar) {
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
        avatar: avatar
      });
      newUser[provider] = {id: providerId};
      //TODO: send social generated password to email
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

function ensureEmailIsConfirmed(req, res, next) {
  var isEmailConfirmed = function () {
    if (!req.user.isEmailConfirmed) {
      return res.status(405).send({error: 'You need confirm your email before action.'});
    }
    next();
  };
  ensureAuthenticated(req, res, isEmailConfirmed);
}

function ensureAdminRole(req, res, next) {
  var isAdmin = function() {
    if (req.user.role !== 'admin') {
      return res.status(500).send({error: 'Not allowed. You should be admin to do this action'});
    }
    next();
  };
  ensureAuthenticated(req, res, isAdmin);
}
