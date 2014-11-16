define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      
      playService = require('./play.service'),
      calendarService = require('./calendar.service'),

      module = angular.module('DataLayerModule', []);

  module.factory('dgCalendarService', calendarService);
  module.factory('dgPlayService', playService);
  
  return module;
});