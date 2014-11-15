define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      directive = require('./play-new.directive'),
      module = angular.module('AddPlayModule', []);

  module.directive('dgAddPlay', directive);

  return module;
});