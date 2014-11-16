define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      pageTemplate = require('text!./page.tpl.html'),

      CalendarModule = require('modules/calendar'),
      AddPlayModule = require('modules/play-new'),

      //Init Screen
      module = angular.module('CalendarScreen', [
        CalendarModule.name,
        AddPlayModule.name
      ]);

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