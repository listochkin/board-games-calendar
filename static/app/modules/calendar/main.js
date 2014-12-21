define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      
      calendarPageTemplate = require('text!./templates/calendar-page.tpl.html'),
      canendarDirective = require('./directives/calendar.directive'),

      module = angular.module('CalendarModule', []);

  module.directive('dgCalendar', canendarDirective);

  CalendarScreen.$inject = ['$routeProvider'];
  module.config(CalendarScreen);

  return module;

  function CalendarScreen($routeProvider) {
    $routeProvider
      .when('/calendar', {
        template: calendarPageTemplate
      })
      .otherwise({
        redirectTo: '/calendar'
      });
  }
});