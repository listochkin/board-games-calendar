define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      directive = require('./calendar.directive'),
      module = angular.module('CalendarModule', []);

  module.directive('dgCalendar', directive);

  return module;
});