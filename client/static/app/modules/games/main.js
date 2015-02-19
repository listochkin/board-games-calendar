define(function (require) {
  'use strict';

  var angular = require('angular'),

      GamesListController = require('./controllers/games-list.controller'),
      GamesListTpl = require('text!./templates/games-list.tpl.html'),

      GamesDetailsController = require('./controllers/game-details.controller'),
      GamesDetailsTpl = require('text!./templates/game-details.tpl.html'),

      TypeAheadDirective = require('./directives/type-ahead.directive'),

      module = angular.module('GamesModule', ['UtilsModule', 'BGGModule']);

  module.directive('dgTypeAhead', TypeAheadDirective);

  GamesModuleConfig.$inject = ['$routeProvider'];
  module.config(GamesModuleConfig);

  return module;

  function GamesModuleConfig($routeProvider) {
    $routeProvider
        .when('/games', {
          template: GamesListTpl,
          controllerAs: 'dgGListIns',
          controller: GamesListController,
          resolve: {
            games: GamesListController.resolver.getGamesData
          }
        })
        .when('/games/:gameId/mode/view', {
          template: GamesDetailsTpl,
          controllerAs: 'dgGDetailsIns',
          controller: GamesDetailsController,
          resolve: {
            game: GamesDetailsController.resolver.getGameData
          }
        });
  }
});