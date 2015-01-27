/*jslint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    security = require('../security'),
    controller = require('./users.controller');

router.post('/facebook', controller.facebook);
router.post('/google', controller.google);

router.post('/login', controller.login);
router.post('/', controller.register);
router.get('/me', security.decodeUserId, controller.me);
router.put('/me', security.ensureAuthenticated, controller.updateMe);

router.put('/:userId', controller.modifyUser);
router.get('/:userId', controller.getUser);

module.exports.api = router;