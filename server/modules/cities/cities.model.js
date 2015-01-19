/*jslint node: true */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CitiesSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
 }
});

module.exports = mongoose.model('Cities', CitiesSchema);
