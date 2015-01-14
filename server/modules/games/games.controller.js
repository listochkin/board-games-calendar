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
  GameModel.countByName(req.query.search)
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

function CreateGame(req, res) {
  var dataFields = getRequestDataFields(req);
  GameModel.create(dataFields)
  .then(function(game) {
    res.status(200).json(game);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function DeleteGame(req, res) {
  GameModel.findByIdAndRemove(req.params.gameId).exec()
  .then(function() {
    res.status(200).json({});
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function ModifyGame(req, res) {
  var dataFields = getRequestDataFields(req);
  GameModel.findOneAndUpdate({_id: req.params.gameId}, dataFields).exec()
  .then(function(game) {
    res.status(200).json(game);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function getRequestDataFields(req) {
  var dataFields = {
    nameOrigin: req.body.nameOrigin,
    nameTranslated: req.body.nameTranslated,
    playersMin: req.body.playersMin,
    playersMax: req.body.playersMax,
    ratio: req.body.ratio,
    avgTimePlay: req.body.avgTimePlay,
    description: req.body.description
  };
  return dataFields;
}