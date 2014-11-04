define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      directive = require('./calendar.directive'),
      service = require('./calendar.service'),
      module = angular.module('CalendarModule', []);

  module.directive('dgCalendar', directive);
  module.factory('dgCalendarService', service);

  return module;
});