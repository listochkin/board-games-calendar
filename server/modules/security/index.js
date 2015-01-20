/*jslint node: true */
'use strict';

var jwt = require('jwt-simple'),
    moment = require('moment'),
    config = require('../../config');


module.exports.createToken = createToken;
module.exports.ensureAuthenticated = ensureAuthenticated;

function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send(
        {message: 'Please make sure your request has an Authorization header'});
  }
  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, config.tokenSecret);
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({message: 'Token has expired'});
  }
  req.user = payload.sub;
  next();
}

function createToken(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.tokenSecret);
}