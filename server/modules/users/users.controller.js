/*jslint node: true */
'use strict';

var async = require('async'),
    qs = require('querystring'),
    request = require("request"),
    config = require('../../config'),
    UserModel = require('./users.model');

module.exports.facebook = facebook;
module.exports.google = google;
module.exports.getUser = getUser;
module.exports.modifyUser = modifyUser;
module.exports.register = register;
module.exports.login = login;

function register(req, res) {

}

function login(req, res) {
  
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
    function(callback) {
      request.get({url: config.auth.facebook.accessTokenUrl, qs: params, json: true},
      function(err, resp, accessToken) {
        callback(err, accessToken);
      });
    },
    function(accessToken, callback) {
      accessToken = qs.parse(accessToken);
      request.get({url: config.auth.facebook.graphApiUrl, qs: accessToken, json: true},
      function(err, resp, profile) {
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
    function(callback) {
      request.post({url: config.auth.google.accessTokenUrl, json: true, form: params},
      function(err, resp, accessToken) {
        callback(err, accessToken);
      });
    },
    function(accessToken, callback) {
      accessToken = accessToken.access_token;
      var headers = {Authorization: 'Bearer ' + accessToken};
      
      request.get({url: config.auth.google.peopleApiUrl, headers: headers, json: true},
      function(err, resp, profile) {
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

  console.log(profile);

  //TODO: check facebook/google .id OR user email
  //TODO: and add .id if does not exist
  UserModel.findOne({email: profile.email}).exec()
    .then(function(data) {
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
    .then(function(data) {
      res.status(200).json({token: token, user: data});
    });
}
