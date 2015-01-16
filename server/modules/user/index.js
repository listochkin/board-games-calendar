/*jslint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./user.controller');

router.post('/facebook', controller.facebook);

module.exports.api = router;