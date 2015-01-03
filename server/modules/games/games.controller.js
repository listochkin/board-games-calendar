/*jslint node: true */
'use strict';

var EventEmitter = require('global-eventemitter'),
    Q = require('q'),
    GameModel = require('./model');

module.exports.getGames = GetGames;
module.exports.getGamesCount = GetGamesCount;
module.exports.getGame = GetGame;
module.exports.createGame = CreateGame;
module.exports.deleteGame = DeleteGame;
module.exports.modifyGame = ModifyGame;

function GetGames(req, res) {
  GameModel.findByName(req.query.search, req.query.page)
  .then(function(data) {
    res.status(200).json(data);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function GetGamesCount(req, res) {
  GameModel.сountByName(req.query.search)
  .then(function(count) {
    res.status(200).json({count: count});
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function GetGame(req, res) {
  GameModel.findById(req.params.gameId).exec()
  .then(function(data) {
    res.status(200).json(data);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function CreateGame() {

}

function DeleteGame() {

}

function ModifyGame() {

}