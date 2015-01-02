/*jslint node: true */
'use strict';

var GamesModule = require('./modules/games');

module.exports = RegisterRoutes;

function RegisterRoutes(app) {
  console.log('Registering modules...');
  
  app.use('/api/games', GamesModule.api);

  console.log('Done!');
}
