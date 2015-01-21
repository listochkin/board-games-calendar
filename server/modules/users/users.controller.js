/*jslint node: true */
'use strict';

var async = require('async'),
    qs = require('querystring'),
    request = require("request"),
    security = require('../security'),
    config = require('../../config'),
    UserModel = require('./users.model');

module.exports.facebook = facebook;
module.exports.google = google;
module.exports.getUser = getUser;
module.exports.modifyUser = modifyUser;
module.exports.register = register;
module.exports.login = login;
module.exports.me = me;
module.exports.updateMe = updateMe;

function register(req, res) {
  var user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function () {
    console.log(user);
    res.send({token: security.createToken(user)});
  });
}

function me(req, res) {
  UserModel.findById(req.user, function (err, user) {
    res.send({data: user});
  });
}

function updateMe(req, res) {
  //TODO : check id from token
  UserModel.findById(req.user, function (err, user) {
    if (!user) {
      return res.status(400).send({message: 'User not found'});
    }
    //TODO : add field
    user.email = req.body.email || user.email;
    user.save(function (err) {
      res.status(200).end();
    });
  });
}

function login(req, res) {
  UserModel.findOne(
      {email: req.body.email},
      {hashedPassword: true, salt: true},
      function (err, user) {
        if (!user) {
          return res.status(401).send({message: 'User not exist. Wrong email and/or password'});
        }
        user.authenticate(req.body.password, function (isMatch) {
          if (!isMatch) {
            return res.status(401).send({message: 'Wrong email and/or password'});
          }
          res.send({token: security.createToken(user)});
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
    processSocialLogin(err, req, res, profile);
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
    processSocialLogin(err, req, res, profile);
  });
}

function processSocialLogin(err, req, res, profile) {
  var token = req.headers.authorization.split(' ')[1];
  //TODO: add error catch

  //TODO: check facebook/google .id OR user email
  //TODO: and add .id if does not exist
  UserModel.findOne({email: profile.email}).exec()
    .then(function (data) {
      if (data) {
        return data;
      }
      var newUser = new UserModel({
        username: profile.username,
        name: profile.name,
        email: profile.email,
        avatar: profile.picture || ''
      });
      return newUser.save().exec();
    })
    .then(function (data) {
      res.status(200).json({token: '', user: data});
    });
}
