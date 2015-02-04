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
  PlayModel.findByDateAndCity(
    req.query.startDate, req.query.endDate, req.query.city, req.query.page
  )
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
  PlayModel.findById(req.params.playId)
  .populate('players')
  .exec()
  .then(function(data) {
    res.status(200).json(data);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function createPlay(req, res) {
  var dataFields = getRequestDataFields(req);
  dataFields.creator = req.user._id;

  PlayModel.create(dataFields)
  .then(function(data) {
    res.status(200).json(data);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function deletePlay(req, res) {
  PlayModel.findById(req.params.playId).exec()
  .then(function(play) {
    if (!play.creator.equals(req.user._id)) {
      throw "Only owner can delete play";
    } else {
      return PlayModel.findByIdAndRemove(req.params.playId).exec();
    }
  })
  .then(function(){
    res.status(200).json({});
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function modifyPlay(req, res) {
  var dataFields = getRequestDataFields(req);
  PlayModel.findOneAndUpdate({_id: req.params.playId}, dataFields)
  .populate('players')
  .exec()
  .then(function(game) {
    res.status(200).json(game);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function joinPlay(req, res) {
  PlayModel.findById(req.params.playId).exec()
  .then(function(play) {
    if(!play.players) {
      play.players = [];
    }
    if(play.players.indexOf(req.user._id) === -1) {
      play.players.push(req.user._id);
    }
    // Can not use promise. Mongoose issue
    var defer = Q.defer();
    play.save(function(err, play) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(play);
      }
    });
    return defer.promise;
  })
  .then(function() {
    return PlayModel.findById(req.params.playId)
      .populate('players')
      .exec();
  })
  .then(function(play) {
    res.status(200).json(play);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function leavePlay(req, res) {
  PlayModel.findById(req.params.playId).exec()
  .then(function(play) {
    if(!play.players) {
      play.players = [];
    }
    var userIndex = play.players.indexOf(req.user._id);
    if(userIndex !== -1) {
      play.players.splice(userIndex, 1);
    }
    // Can not use promise. Mongoose issue
    var defer = Q.defer();
    play.save(function(err, play) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(play);
      }
    });
    return defer.promise;
  })
  .then(function(play) {
    return PlayModel.findById(req.params.playId)
      .populate('players')
      .exec();
  })
  .then(function(play) {
    res.status(200).json(play);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function getRequestDataFields(req) {
  var dataFields = {
    name: req.body.name,
    playersMin: req.body.playersMin,
    playersMax: req.body.playersMax,
    city: req.body.city,
    address: req.body.address,
    when: req.body.when,
    game: req.body.gameId,
    description: req.body.description
  };
  return dataFields;
}