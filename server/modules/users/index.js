/*jslint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./users.controller');

router.post('/facebook', controller.facebook);
router.post('/google', controller.google);

router.post('/login', controller.login);
router.post('/', controller.register);
router.put('/:userId', controller.modifyUser);
router.get('/:userId', controller.getUser);

module.exports.api = router;