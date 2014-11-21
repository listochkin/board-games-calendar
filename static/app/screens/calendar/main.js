define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      pageTemplate = require('text!./page.tpl.html'),
      module = angular.module('CalendarScreen', []);

  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/calendar', {
        template: pageTemplate
      })
      .otherwise({
        redirectTo: '/calendar'
      });
  }]);

  return module;
});