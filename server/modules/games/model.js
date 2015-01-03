/*jslint node: true */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GamesSchema = new Schema({
  nameOrigin: {
    type: String,
    required: true,
    index: true
  },
  nameTranslated: {
    type: String,
    index: true
  },
  players: {
    min: Number,
    max: Number
  },
  ratio: Number,
  avgTimePlay: Number,
  description: String
});

GamesSchema.statics.findByName = FindByName;
GamesSchema.statics.countByName = CountByName;

module.exports = mongoose.model('Games', GamesSchema);

function FindByName(name, page) {
  var searchRegex = new RegExp(name, 'i');
  var query = this.find()
  .or([
    {nameOrigin: searchRegex},
    {nameTranslated: searchRegex}
  ])
  .sort({nameOrigin: 'asc'})
  .limit(20);
  page = parseInt(page, 10);
  if (page && page > 1) {
    query.skip(20*page);
  }

  return query.exec();
}

function CountByName(name) {
  var searchRegex = new RegExp(name, 'i');
  var query = this.find()
  .or([
    {nameOrigin: searchRegex},
    {nameTranslated: searchRegex}
  ]);
  return query.count().exec();
}
