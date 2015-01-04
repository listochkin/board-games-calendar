/*jslint node: true */
'use strict';

var express = require('express'),
    app = express(),
    config = require('./config'),
    routes = require('./routes'),

    session = require('express-session'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),

    mongoose = require('mongoose');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Set static dir servering
var staticDirName = __dirname.split('/');
staticDirName.pop();
app.use(express.static(staticDirName.join('/') + '/client/static'));

// Set development nasty logs
if (process.env.NODE_ENV === 'development') {
   app.use(errorHandler());
}

// Session initialize
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// Set renderer
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/pages');
app.set('view engine', 'html');

// Register routes
routes(app);

// Default route index page render
app.get('/', function (req, res) {
  res.render('index');
});

var server = app.listen(config.port, config.ip, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s, mode %s', host, port, process.env.NODE_ENV);
});