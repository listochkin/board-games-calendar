define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      directive = require('./main-menu.directive'),
      module = angular.module('MainMenuModule', []);

  module.directive('dgMainMenu', directive);

  return module;
});