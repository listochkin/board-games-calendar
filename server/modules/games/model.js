/*jslint node: true */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExportSchema = new Schema({
  nameOrigin: {
    type: String,
    required: true
  },

  nameTranslated: {
    type: String
  },

  ratio: {
    type: Number
  },

  players: {
    min: {
      type: Number
    },

    max: {
      type: Number
    }
  },

  avgTimePlay: {
    type: Number
  },

  description: {
    type: String
  }
});

module.exports = mongoose.model('Games', ExportSchema);