/*jslint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./wishlist.controller');

// Registering routes
router.get('/', controller.getWishlist);
router.put('/:wishlistId', controller.updateWishlist);
router.post('/', controller.createWishlist);

module.exports.routes = router;