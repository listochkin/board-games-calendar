define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      
      СalendarPageTemplate = require('text!./templates/calendar-page.tpl.html'),
      СalendarDirective = require('./directives/calendar.directive'),
      СalendarService = require('./services/calendar.service'),

      module = angular.module('CalendarModule', []);

  module.directive('dgCalendar', СalendarDirective);
  module.factory('dgCalendarService', СalendarService);

  CalendarScreen.$inject = ['$routeProvider'];
  module.config(CalendarScreen);

  return module;

  function CalendarScreen($routeProvider) {
    $routeProvider
      .when('/calendar', {
        template: СalendarPageTemplate,
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/calendar'
      });
  }
});