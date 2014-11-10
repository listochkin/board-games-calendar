define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      service = require('./game.service'),
      directive = require('./game.directive'),
      module = angular.module('GameModule', []);

  module.directive('dgGame', directive);
  module.factory('dgGameService', service);

  return module;
});