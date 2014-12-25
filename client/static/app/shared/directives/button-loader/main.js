define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      directive = require('./button-loader.directive'),
      module = angular.module('ButtonLoaderModule', []);

  module.directive('dgButtonLoader', directive);

  return module;
});