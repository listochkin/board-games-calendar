define(function(require) {
  var angular = require('angular'),
      directive = require('./directive'),
      service = require('./service'),
      module = angular.module('CalendarModule', []);

  module.directive('dgCalendar', directive);
  module.factory('dgCalendarService', service);

  return module;
});