/*jslint node: true */
'use strict';

var WishlistModel = require('./model'),
    DEFAULT_PERIOD = 'Сразу же';

module.exports.getWishlist = getWishlist;
module.exports.createWishlist = createWishlist;
module.exports.updateWishlist = updateWishlist;

function getWishlist(req, res) {
  WishlistModel.findOne({ userId: req.query.userId })
  .populate('gameSubscriptions')
  .populate('citySubscriptions')
  .exec()
  .then(function(data) {
     res.status(200).json({data: data});
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function createWishlist(req, res) {
  var dataFields = getRequestDataFields(req);
  WishlistModel.create(dataFields)
  .then(function(wishlist) {
    res.status(200).json(wishlist);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function updateWishlist(req, res) {
  var dataFields = getRequestDataFields(req);
  WishlistModel.findOneAndUpdate({_id: req.params.wishlistId}, dataFields).exec()
  .then(function(wishlist) {
    res.status(200).json(wishlist);
  }, function(err) {
    res.status(500).json({error: err});
  });
}

function getRequestDataFields(req) {
  return {
    userId: req.body.userId,
    gameSubscriptions: req.body.gameSubscriptions || [],
    citySubscriptions: req.body.citySubscriptions || [],
    notificationPeriod: req.body.notificationPeriod || DEFAULT_PERIOD
  };
}