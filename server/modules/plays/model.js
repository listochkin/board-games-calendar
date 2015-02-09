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
  status: {
    type: 'string',
    enum: ['not started', 'ended', 'canceled']
  },
  description: Schema.Types.Mixed
});

PlaySchema.statics.getPlays = getPlays;
PlaySchema.statics.getPlaysCount = getPlaysCount;
PlaySchema.statics.PAGE_LIMIT = PAGE_LIMIT;

module.exports = mongoose.model('Plays', PlaySchema);

function getPlays(startDate, endDate, city, page, search, filter, userId) {
  filter = filter? JSON.parse(filter) : {};
  var queryObj = {};
  if (startDate && endDate) {
    queryObj.when = {
      '$gte': moment(startDate, "DD-MM-YYYY").toDate(),
      '$lt': moment(endDate, "DD-MM-YYYY").toDate()
    };
  }
  if (city) {
    queryObj['city.id'] = city;
  }

  if (!filter.includeOld) {
    queryObj.when = {
      '$gte': new Date()
    };
  }

  if (filter.onlyMy) {
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

function getPlaysCount(search) {
  if (search) {
    var searchRegex = new RegExp(search, 'i');
    /*jshint validthis:true */
    return this.find().or([
      {name: searchRegex},
      {'city.name': searchRegex},
      {address: searchRegex}
    ]).count().exec();

  } else {
    return this.find().count().exec();
  }
}