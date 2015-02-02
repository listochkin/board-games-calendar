/*jslint node: true */
'use strict';

var GamesModule = require('./modules/games'),
    PlaysModule = require('./modules/plays'),
    UsersModule = require('./modules/users'),
    CitiesModule = require('./modules/cities'),
    WishlistModule = require('./modules/wishlist');

module.exports = RegisterRoutes;

function RegisterRoutes(app) {
  console.log('Registering modules...');

  app.use('/api/games', GamesModule.routes);
  app.use('/api/plays', PlaysModule.routes);
  app.use('/api/wishlist', WishlistModule.routes);
  app.use('/api/cities', CitiesModule.routes);
  app.use('/auth', UsersModule.routes);

  console.log('Done!');
}
