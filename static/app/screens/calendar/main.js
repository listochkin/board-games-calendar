define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      controller = require('./screen.calendar.controller'),
      pageTemplate = require('text!./page.tpl.html'),

      CalendarModule = require('modules/calendar'),
      GameModule = require('modules/game'),

      //Init Screen
      module = angular.module('CalendarScreen', [
        CalendarModule.name,
        GameModule.name
      ]);

  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/calendar', {
        template: pageTemplate,
        controller: 'CalendarScreenController'
      })
      .otherwise({
        redirectTo: '/calendar'
      });
  }]);

  module.controller('CalendarScreenController', controller);

  return module;
});