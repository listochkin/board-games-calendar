define(function(require) {
  'use strict';
  
  var angular = require('angular'),

      controller = require('./games-screen.controller'),
      pageListTemplate = require('text!./page-list.tpl.html'),
      pageDetailsTemplate = require('text!./page-details.tpl.html'),
      module = angular.module('GamesScreen', []);

  GamesScreen.$inject = ['$routeProvider'];
  module.config(GamesScreen);

  return module;

  function GamesScreen($routeProvider) {
    $routeProvider
      .when('/games', {
        template: pageListTemplate,
        controllerAs: 'dgGamesScreenCtrl',
        controller: controller,
        resolve: {
          gamesData: controller.resolver.getGamesData
        }
      })
      .when('/games/page/:pageId', {
        template: pageListTemplate,
        controllerAs: 'dgGamesScreenCtrl',
        controller: controller,
        resolve: {
          gamesData: controller.resolver.getGamesData
        }
      })
      .when('/games/:gameId/mode/:mode', {
        template: pageDetailsTemplate
      });
  }
});