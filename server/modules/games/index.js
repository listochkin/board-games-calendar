/*jslint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./games.controller');

// Registering routes
router.get('/', controller.getGames);
router.get('/count', controller.getGamesCount);
router.get('/:gameId', controller.getGame);

// TODO: add permissions check middleware
router.post('/', controller.createGame);
router.delete('/:gameId', controller.deleteGame);
router.put('/:gameId', controller.modifyGame);

module.exports.api = router;