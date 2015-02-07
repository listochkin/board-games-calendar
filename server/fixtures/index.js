var config = require('../config'),
    mongoose = require('mongoose'),
    fixtures = require('node-mongoose-fixtures'),
    Q = require('q');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

var defer = Q.defer();

defer.promise.then(function() {
  console.log('Done');
  process.exit(0);
});

