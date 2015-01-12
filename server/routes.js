/*jslint node: true */
'use strict';

var GamesModule = require('./modules/games'),
    PlaysModule = require('./modules/plays');

module.exports = RegisterRoutes;

function RegisterRoutes(app) {
  console.log('Registering modules...');
  
  app.use('/api/games', GamesModule.api);
  app.use('/api/plays', PlaysModule.api);

  console.log('Done!');
}
