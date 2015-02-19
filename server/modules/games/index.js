/*jslint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./games.controller');

// Registering routes
router.get('/bgg/*', controller.proxyBGG);


module.exports.routes = router;