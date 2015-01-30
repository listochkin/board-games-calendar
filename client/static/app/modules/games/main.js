define(function(require) {
  'use strict';
  
  var angular = require('angular'),

      GamesListController = require('./controllers/games-list.controller'),
      GamesListTpl = require('text!./templates/games-list.tpl.html'),
      GameEditTpl = require('text!./templates/game-add-edit.tpl.html'),

      GamesDetailsController = require('./controllers/game-details.controller'),
      GamesDetailsTpl = require('text!./templates/game-details.tpl.html'),

      GameService = require('./services/game.service'),

      TypeAheadDirective = require('./directives/type-ahead.directive'),

      module = angular.module('GamesModule', []);

  module.factory('dgGameService', GameService);
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
          games: GamesListController.resolver.getGamesData,
          gamesCount: GamesListController.resolver.getGamesCount
        }
      })
      .when('/games/page/:pageId', {
        template: GamesListTpl,
        controllerAs: 'dgGListIns',
        controller: GamesListController,
        resolve: {
          games: GamesListController.resolver.getGamesData,
          gamesCount: GamesListController.resolver.getGamesCount
        }
      })
      .when('/games/create', {
        template: GameEditTpl,
        controllerAs: 'dgGDetailsIns',
        controller: GamesDetailsController,
        resolve: {
          game: GamesDetailsController.resolver.getNewGameData
        }
      })
      .when('/games/:gameId/mode/view', {
        template: GamesDetailsTpl,
        controllerAs: 'dgGDetailsIns',
        controller: GamesDetailsController,
        resolve: {
          game: GamesDetailsController.resolver.getGameData
        }
      })
      .when('/games/:gameId/mode/edit', {
        template: GameEditTpl,
        controllerAs: 'dgGDetailsIns',
        controller: GamesDetailsController,
        resolve: {
          game: GamesDetailsController.resolver.getGameData
        }
      });
  }
});