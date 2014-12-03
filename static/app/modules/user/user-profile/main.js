define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      directive = require('./user-profile.directive'),
      module = angular.module('UserProfileModule', []);

  module.directive('dgUserProfile', directive);

  return module;
});