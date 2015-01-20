var config = require('../config'),
    mongoose = require('mongoose'),
    fixtures = require('node-mongoose-fixtures'),
    Q = require('Q');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

var defer = Q.defer();
fixtures(require('./cities'), mongoose, function() {
  defer.resolve();
});

defer.promise.then(function() {
  console.log('Cities loaded');
  process.exit(0);
});

