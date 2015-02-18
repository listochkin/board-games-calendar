/*jslint node: true */
'use strict';

var moment = require('moment'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    PAGE_LIMIT = 10;

// TODO: set correct validation
// Real types like Number instead of Mixed makes undefined values invalid
var PlaySchema = new Schema({
  /*name: {
    type: String,
    required: true,
    index: true
  },
  img: {
    type: String,
    required: true
  },*/
  playersMin: {
    type: Number,
    required: true
  },
  playersMax: {
    type: Number,
    required: true
  },
  city: {
    type: Schema.Types.Mixed,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  when: {
    type: Date,
    required: true
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Games'
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  _canceled: {
    type: Boolean
  },
  description: Schema.Types.Mixed
});

PlaySchema.statics.getPlays = getPlays;
PlaySchema.statics.getPlaysCount = getPlaysCount;
PlaySchema.statics.PAGE_LIMIT = PAGE_LIMIT;

PlaySchema.virtual('status')
  .set(function (status) {
    this._canceled = status === 'canceled';
  }).get(function () {
    return this.canceled ? 'canceled' : (tillNow(this.when) ? 'ended' : 'not-started');
  });

PlaySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Plays', PlaySchema);

function tillNow(targetDate){
  targetDate = targetDate instanceof Date ? targetDate : new Date(targetDate);
  return targetDate.getTime() <= Date.now();
}

function getPlays(startDate, endDate, city, page, search, onlyMy, includeOld, userId) {
  var queryObj = {};
  if (startDate && endDate) {
    queryObj.when = {
      '$gte': moment(startDate, "DD-MM-YYYY").toDate(),
      '$lt': moment(endDate, "DD-MM-YYYY").toDate()
    };
  } else if (!includeOld) {
    queryObj.when = {
      '$gte': new Date()
    };
  }
  if (city) {
    queryObj['city.id'] = city;
  }
  if (onlyMy) {
    queryObj.creator = userId;
  }

  /*jshint validthis:true */
  var query = this.find(queryObj).populate('game');

  if (search) {
    var searchRegex = new RegExp(search, 'i');
    query.or([
      {name: searchRegex},
      {'city.name': searchRegex},
      {address: searchRegex}
    ]);
  }

  if (page) {
    page = parseInt(page, 10);
    page -= 1;

    query.limit(
        PAGE_LIMIT
    ).skip(
        PAGE_LIMIT * page
    ).sort({
      when: 'asc'
    });
  }
  return query.exec();
}

function getPlaysCount(search, onlyMy, includeOld, userId) {

  var queryObj = {};

  if (!includeOld) {
    queryObj.when = {
      '$gte': new Date()
    };
  }

  if (onlyMy) {
    queryObj.creator = userId;
  }

  /*jshint validthis:true */
  var query = this.find(queryObj);

  if (search) {
    var searchRegex = new RegExp(search, 'i');
    query.or([
      {name: searchRegex},
      {'city.name': searchRegex},
      {address: searchRegex}
    ]).count().exec();

  }

  return query.count().exec();
}