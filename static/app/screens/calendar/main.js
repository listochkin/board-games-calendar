define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      pageTemplate = require('text!./page.tpl.html'),
      module = angular.module('CalendarScreen', []);

  CalendarScreen.$inject = ['$routeProvider'];
  module.config(CalendarScreen);

  return module;

  function CalendarScreen($routeProvider) {
    $routeProvider
      .when('/calendar', {
        template: pageTemplate
      })
      .otherwise({
        redirectTo: '/calendar'
      });
  }
});