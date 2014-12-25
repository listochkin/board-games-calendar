var express = require('express');
var app = express();

// Set static dir servering
var staticDirName = __dirname.split('/');
staticDirName.pop();
app.use(express.static(staticDirName.join('/') + '/client/static'));

// Set renderer
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/pages');
app.set('view engine', 'html');


app.get('/', function (req, res) {
  res.render('index');
});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});