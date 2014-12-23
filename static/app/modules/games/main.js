define(function(require) {
  'use strict';
  
  var angular = require('angular'),

      gamesListController = require('./controllers/games-list.controller'),
      gamesListTpl = require('text!./templates/games-list.tpl.html'),
      gameEditTpl = require('text!./templates/game-add-edit.tpl.html'),

      gamesDetailsController = require('./controllers/game-details.controller'),
      gamesDetailsTpl = require('text!./templates/game-details.tpl.html'),
      
      module = angular.module('GamesModule', []);

  GamesModuleConfig.$inject = ['$routeProvider'];
  module.config(GamesModuleConfig);

  return module;

  function GamesModuleConfig($routeProvider) {
    $routeProvider
      .when('/games', {
        template: gamesListTpl,
        controllerAs: 'dgGListIns',
        controller: gamesListController,
        resolve: {
          games: gamesListController.resolver.getGamesData
        }
      })
      .when('/games/create', {
        template: gameEditTpl,
        controllerAs: 'dgGDetailsIns',
        controller: gamesDetailsController,
        resolve: {
          game: gamesDetailsController.resolver.getNewGameData
        }
      })
      .when('/games/page/:pageId', {
        template: gamesListTpl,
        controllerAs: 'dgGListIns',
        controller: gamesListController,
        resolve: {
          games: gamesListController.resolver.getGamesData
        }
      })
      .when('/games/:gameId/mode/view', {
        template: gamesDetailsTpl,
        controllerAs: 'dgGDetailsIns',
        controller: gamesDetailsController,
        resolve: {
          game: gamesDetailsController.resolver.getGameData
        }
      })
      .when('/games/:gameId/mode/edit', {
        template: gameEditTpl,
        controllerAs: 'dgGDetailsIns',
        controller: gamesDetailsController,
        resolve: {
          game: gamesDetailsController.resolver.getGameData
        }
      });
  }
});