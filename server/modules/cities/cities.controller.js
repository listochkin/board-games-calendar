/*jslint node: true */
'use strict';

var CitiesModel = require('./cities.model');

module.exports.getCities = getCities;

function getCities(req, res) {
  CitiesModel.find().exec()
  .then(function(data) {
    res.status(200).json(data);
  }, function(err) {
    res.status(500).json({error: err});
  });
}
