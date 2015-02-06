/*jslint node: true */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WishlistScheme = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  gameSubscriptions: [{
    type: Schema.Types.ObjectId,
    ref: 'Games'
  }],
  citySubscriptions: [{
    type: Schema.Types.ObjectId,
    ref: 'Cities'
  }],
  notificationPeriod: {
    type: String
  }
});

module.exports = mongoose.model('Wishlist', WishlistScheme);
