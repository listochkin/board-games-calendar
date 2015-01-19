/*jslint node: true */
'use strict';

var GamesModule = require('./modules/games'),
    PlaysModule = require('./modules/plays'),
    UsersModule = require('./modules/users');

module.exports = RegisterRoutes;

function RegisterRoutes(app) {
  console.log('Registering modules...');
  
  app.use('/api/games', GamesModule.api);
  app.use('/api/plays', PlaysModule.api);
  app.use('/auth', UsersModule.api);

  console.log('Done!');
}
