/*jslint node: true */
'use strict';

var PlayModel = require('./model'),
    Q = require('q');

module.exports.getPlays = getPlays;
module.exports.getPlaysCount = getPlaysCount;
module.exports.getPlay = getPlay;
module.exports.createPlay = createPlay;
module.exports.deletePlay = deletePlay;
module.exports.modifyPlay = modifyPlay;
module.exports.joinPlay = joinPlay;
module.exports.leavePlay = leavePlay;

function getPlays(req, res) {
  PlayModel.getPlays(
    req.body.startDate, req.body.endDate, req.body.cityId,
    req.query.page, req.query.search,
    _stringToBool(req.query.onlyMy),
    _stringToBool(req.query.includeOld),
    req.userId
  ).then(function (data) {
      res.status(200).json(data);
    }, function (err) {
      res.status(500).json({error: err});
    });
}

function getPlaysCount(req, res) {
  PlayModel.getPlaysCount(
    req.query.search,
    _stringToBool(req.query.onlyMy),
    _stringToBool(req.query.includeOld),
    req.userId
  ).then(function (count) {
      res.status(200).json({count: count});
    }, function (err) {
      res.status(500).json({error: err});
    });
}

function getPlay(req, res) {
  PlayModel.findById(req.params.playId)
    .populate('players')
    .populate('creator')
    .exec()
    .then(function (data) {
      res.status(200).json(data);
    }, function (err) {
      res.status(500).json({error: err});
    });
}

function createPlay(req, res) {
  var dataFields = getRequestDataFields(req);
  dataFields.creator = req.user._id;

  PlayModel.create(dataFields)
    .then(function (data) {
      res.status(200).json(data);
    }, function (err) {
      res.status(500).json({error: err});
    });
}

function deletePlay(req, res) {
  PlayModel.findById(req.params.playId).exec()
    .then(function (play) {
      if (!play.creator.equals(req.user._id)) {
        throw "Only owner can delete play";
      } else {
        return PlayModel.findByIdAndRemove(req.params.playId).exec();
      }
    })
    .then(function (play) {
      res.status(200).json({});
    }, function (err) {
      res.status(500).json({error: err});
    });
}

function modifyPlay(req, res) {
  var dataFields = getRequestDataFields(req);
  PlayModel.findById(req.params.playId).exec()
    .then(function (play) {
      if (play.creator.equals(req.user._id)) {
        return PlayModel.findOneAndUpdate({_id: req.params.playId}, dataFields)
          .populate('players')
          .populate('creator')
          .exec();
      } else {
        res.status(500).json({error: 'Only creator can modify play'});
      }
    })
    .then(function (play) {
      res.status(200).json(play);
    }, function (err) {
      res.status(500).json({error: err});
    });
}

function joinPlay(req, res) {
  PlayModel.findById(req.params.playId).exec()
    .then(function (play) {
      if (!play.players) {
        play.players = [];
      }
      if (play.players.indexOf(req.user._id) === -1) {
        play.players.push(req.user._id);
      }
      // Can not use promise. Mongoose issue
      var defer = Q.defer();
      play.save(function (err, play) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(play);
        }
      });
      return defer.promise;
    })
    .then(function () {
      return PlayModel.findById(req.params.playId)
        .populate('players')
        .populate('creator')
        .exec();
    })
    .then(function (play) {
      res.status(200).json(play);
    }, function (err) {
      res.status(500).json({error: err});
    });
}

function leavePlay(req, res) {
  PlayModel.findById(req.params.playId).exec()
    .then(function (play) {
      if (!play.players) {
        play.players = [];
      }
      var userIndex = play.players.indexOf(req.user._id);
      if (userIndex !== -1) {
        play.players.splice(userIndex, 1);
      }
      // Can not use promise. Mongoose issue
      var defer = Q.defer();
      play.save(function (err, play) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(play);
        }
      });
      return defer.promise;
    })
    .then(function (play) {
      return PlayModel.findById(req.params.playId)
        .populate('players')
        .populate('creator')
        .exec();
    })
    .then(function (play) {
      res.status(200).json(play);
    }, function (err) {
      res.status(500).json({error: err});
    });
}

function getRequestDataFields(req) {
  var dataFields = {
    name: req.body.name,
    playersMin: req.body.playersMin,
    playersMax: req.body.playersMax,
    city: {
      id: req.body.city.id,
      formatted_address: req.body.city.formatted_address
    },
    address: req.body.address,
    when: req.body.when,
    game: req.body.game,
    description: req.body.description
  };
  return dataFields;
}

function _stringToBool(value) {
  return !!parseInt(value, 10);
}