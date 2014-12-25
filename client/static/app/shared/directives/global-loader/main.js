define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      directive = require('./global-loader.directive'),
      module = angular.module('GlobalLoaderModule', []);

  module.directive('dgGlobalLoader', directive);

  return module;
});