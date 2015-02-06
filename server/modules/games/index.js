/*jslint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./games.controller'),

    //Users
    UsersModule = require('../users');

// Registering routes
router.get('/', controller.getGames);
router.get('/count', controller.getGamesCount);
router.get('/:gameId', controller.getGame);

router.post('/', UsersModule.api.ensureAdminRole, controller.createGame);
router.delete('/:gameId', UsersModule.api.ensureAdminRole, controller.deleteGame);
router.put('/:gameId', UsersModule.api.ensureAdminRole, controller.modifyGame);

module.exports.routes = router;