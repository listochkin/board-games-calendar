/*jslint node: true */
'use strict';

var GamesModule = require('./modules/games'),
    PlaysModule = require('./modules/plays'),
    UsersModule = require('./modules/users'),
    CitiesModule = require('./modules/cities');

module.exports = RegisterRoutes;

function RegisterRoutes(app) {
  console.log('Registering modules...');

  app.use('/api/games', GamesModule.api);
  app.use('/api/plays', PlaysModule.api);
  app.use('/auth', UsersModule.api);
  app.use('/api/cities', CitiesModule.api);

  console.log('Done!');
}
