/*jslint node: true */
'use strict';

var request = require('request'),
    async = require('async'),
    config = require('../../config'),
    UserModel = require('./user.model');

module.exports.facebook = facebook;

function facebook(req, res) {
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.auth.facebook.clientId,
    redirect_uri: req.body.redirectUri
  };

  async.waterfall([
    function(callback) {
      request.get({url: config.accessTokenUrl, qs: params, json: true},
      function(err, resp, accessToken) {
        callback(err, accessToken);
      });
    },
    function(accessToken, callback) {
      request.get({url: config.graphApiUrl+'?'+accessToken, json: true},
      function(err, resp, profile) {
        callback(err, profile);
      });
    }
  ], function (err, profile) {
     var token = req.headers.authorization.split(' ')[1];
     //TODO: check Mongo user
     // TODO: create token from token
     res.status(200).json({token: token});
  });
}
