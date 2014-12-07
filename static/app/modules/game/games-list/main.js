define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      directive = require('./games-list.directive'),
      module = angular.module('GamesListModule', []);

  module.directive('dgGamesList', directive);

  return module;
});