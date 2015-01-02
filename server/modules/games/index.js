/*jslint node: true */
'use strict';

var PubSub = require('global-eventemitter'),
    Q = require('q'),
    express = require('express'),
    router = express.Router();
    
// Initializing controller eventlisteners
require('./games.controller')();

// Registering routes
router.get('/', GetGames);

module.exports.api = router;

// Implementation

function GetGames(req, res) {
  var defer = Q.defer();
  defer.promise.then(function(result) {
    res.json(200, result);  
  })
  .fail(function(error) {
    res.end(500, error);
  });

  PubSub.emit('bg:games:get:list', defer);
}
