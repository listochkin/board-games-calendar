define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      directive = require('./directives/user-menu.directive'),
      module = angular.module('UserMenuModule', []);

  module.directive('dgUserMenu', directive);

  return module;
});