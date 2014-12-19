define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      directive = require('./game-details.directive'),
      module = angular.module('GameDetailsModule', []);

  module.directive('dgGameDetails', directive);

  return module;
});