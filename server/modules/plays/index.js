/*jslint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./plays.controller'),

    //Users
    UsersModule = require('../users');

// Registering routes
router.get('/', UsersModule.api.decodeUserId, controller.getPlays);
router.get('/count', UsersModule.api.decodeUserId, controller.getPlaysCount);
router.post('/calendar', controller.getPlays);
router.get('/:playId', controller.getPlay);
router.post('/:playId/join', UsersModule.api.ensureAuthenticated, controller.joinPlay);
router.delete('/:playId/join', UsersModule.api.ensureAuthenticated, controller.leavePlay);

router.post('/', UsersModule.api.ensureAuthenticated, controller.createPlay);
router.delete('/:playId', UsersModule.api.ensureAuthenticated, controller.deletePlay);
router.put('/:playId', UsersModule.api.ensureAuthenticated, controller.modifyPlay);

module.exports.routes = router;