define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      directive = require('./game-activity.directive'),
      module = angular.module('GameDetailsModule', []);

  module.directive('dgGameActivity', directive);

  return module;
});