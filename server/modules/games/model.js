/*jslint node: true */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    PAGE_LIMIT = 20;

// TODO: set correct validation
// Real types like Number instead of Mixed makes undefined values invalid
var GamesSchema = new Schema({
  nameOrigin: {
    type: String,
    required: true,
    index: true
  },
  nameTranslated: {
    type: Schema.Types.Mixed,
    index: true
  },
  playersMin: Schema.Types.Mixed,
  playersMax: Schema.Types.Mixed,
  ratio: Schema.Types.Mixed,
  avgTimePlay: Schema.Types.Mixed,
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

GamesSchema.statics.findByName = findByName;
GamesSchema.statics.countByName = countByName;
GamesSchema.statics.PAGE_LIMIT = PAGE_LIMIT;

module.exports = mongoose.model('Games', GamesSchema);

function findByName(name, page) {
  var searchRegex = new RegExp(name, 'i');
  /*jshint validthis:true */
  var query = this.find().or([
    {nameOrigin: searchRegex},
    {nameTranslated: searchRegex}
  ]).sort({
    nameOrigin: 'asc'
  }).limit(PAGE_LIMIT);
  page = parseInt(page, 10);
  if (page && page > 1) {
    query.skip(PAGE_LIMIT*page);
  }

  return query.exec();
}

function countByName(name) {
  var searchRegex = new RegExp(name, 'i');
  /*jshint validthis:true */
  var query = this.find().or([
    {nameOrigin: searchRegex},
    {nameTranslated: searchRegex}
  ]);
  return query.count().exec();
}
