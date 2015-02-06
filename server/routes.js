/*jslint node: true */
'use strict';

var GamesModule = require('./modules/games'),
    PlaysModule = require('./modules/plays'),
    UsersModule = require('./modules/users');

module.exports = RegisterRoutes;

function RegisterRoutes(app) {
  console.log('Registering modules...');

  app.use('/api/games', GamesModule.routes);
  app.use('/api/plays', PlaysModule.routes);
  app.use('/auth', UsersModule.routes);

  console.log('Done!');
}
