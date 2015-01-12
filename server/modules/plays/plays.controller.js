/*jslint node: true */
'use strict';

var PlayModel = require('./model');

module.exports.getPlays = getPlays;
module.exports.getPlaysCount = getPlaysCount;
module.exports.getPlay = getPlay;
module.exports.createPlay = createPlay;
module.exports.deletePlay = deletePlay;
module.exports.modifyPlay = modifyPlay;

function getPlays(req, res) {
  PlayModel.findByDate(req.query.startDate, req.query.endDate)
  .then(function(data) {
    res.status(200).json(data);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function getPlaysCount(req, res) {
  PlayModel.query.count().exec()
  .then(function(count) {
    res.status(200).json({count: count});
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function getPlay(req, res) {
  PlayModel.findById(req.params.playId).exec()
  .then(function(data) {
    res.status(200).json(data);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function createPlay(req, res) {
  var dataFields = getRequestDataFields(req);
  PlayModel.create(dataFields)
  .then(function(data) {
    res.status(200).json(data);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function deletePlay(req, res) {
  PlayModel.findByIdAndRemove(req.params.playId).exec()
  .then(function() {
    res.status(200).json({});
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function modifyPlay(req, res) {
  var dataFields = getRequestDataFields(req);
  PlayModel.findOneAndUpdate({_id: req.params.playId}, dataFields).exec()
  .then(function(game) {
    res.status(200).json(game);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function getRequestDataFields(req) {
  if (!req.body.players) {
    req.body.players = {};
  }
  var dataFields = {
    name: req.body.name,
    playersMin: req.body.playersMin,
    playersMax: req.body.playersMax,
    where: req.body.where,
    when: req.body.when,
    game: req.body.gameId,
    description: req.body.description
  };
  return dataFields;
}