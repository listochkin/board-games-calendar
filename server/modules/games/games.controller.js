var EventEmitter = require('global-eventemitter'),
    GameModel = require('./model');

module.exports = RegisterGamesController;

function RegisterGamesController() {
  EventEmitter.on('bg:games:get:list', GetGamesList);
}

// Controller functions
function GetGamesList(done) {
  console.log('get list');

  done.resolve({a: 2, b: 3});
}