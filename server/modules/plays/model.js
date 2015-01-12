/*jslint node: true */
'use strict';

var moment = require('moment'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// TODO: set correct validation
// Real types like Number instead of Mixed makes undefined values invalid
var PlaySchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  /*img: {
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
  where: {
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
  /*players: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }],*/
  description: Schema.Types.Mixed
});

PlaySchema.statics.findByDate = FindByDate;

module.exports = mongoose.model('Plays', PlaySchema);

function FindByDate(startDate, endDate) {
  var query = this.find({
    'when': {
      '$gte': moment(startDate, "DD-MM-YYYY").toDate(),
      '$lt': moment(endDate, "DD-MM-YYYY").toDate()
    }
  });

  return query.exec();
}
