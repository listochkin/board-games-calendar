define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      Directive = require('./directives/user-menu.directive'),
      UserService = require('./services/user.service'),
      module = angular.module('UserMenuModule', []);

  module.factory('dgUserService', UserService);
  module.directive('dgUserMenu', Directive);

  return module;
});