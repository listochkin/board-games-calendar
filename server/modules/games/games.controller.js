/*jslint node: true */
'use strict';

var request = require("request");

module.exports.proxyBGG = proxyBGG;
//TODO Refactor
function proxyBGG(req, res) {
  request.get({url: req.params[0], qs: req.query},
      function (err, resp) {
        res.status(200).send(resp.body);
      });
}