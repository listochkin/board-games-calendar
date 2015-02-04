/*jslint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./users.controller');

router.post('/facebook', controller.facebook);
router.post('/google', controller.google);

router.post('/login', controller.login);
router.get('/verifyemail/:token', controller.verifyEmail);
router.post('/', controller.register);
router.get('/me', controller.decodeUserId, controller.me);
router.put('/me', controller.ensureAuthenticated, controller.updateMe);

router.get('/me-required', controller.ensureAuthenticated, controller.me);

router.put('/:userId', controller.modifyUser);
router.get('/:userId', controller.getUser);

module.exports.routes = router;
module.exports.api = {
  ensureAuthenticated: controller.ensureAuthenticated
};