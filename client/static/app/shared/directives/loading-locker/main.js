define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      directive = require('./loading-locker.directive'),
      module = angular.module('LoadingLockerModule', []);

  module.directive('dgLoadingLocker', directive);

  return module;
});