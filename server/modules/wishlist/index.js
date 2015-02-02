/*jslint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./wishlist.controller');

// Registering routes
router.get('/', controller.getWishlist);

module.exports.routes = router;