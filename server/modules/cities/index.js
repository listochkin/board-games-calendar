/*jslint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./cities.controller');

router.get('/', controller.getCities);

module.exports.routes = router;
