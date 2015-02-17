define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      
      CalendarPageTemplate = require('text!./templates/calendar-page.tpl.html'),
      CalendarDirective = require('./directives/calendar.directive'),
      CalendarService = require('./services/calendar.service'),

      module = angular.module('CalendarModule', []);

  module.directive('dgCalendar', CalendarDirective);
  module.factory('dgCalendarService', CalendarService);

  CalendarScreen.$inject = ['$routeProvider'];
  module.config(CalendarScreen);

  return module;

  function CalendarScreen($routeProvider) {
    $routeProvider
      .when('/calendar', {
        template: CalendarPageTemplate,
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/calendar'
      });
  }
});