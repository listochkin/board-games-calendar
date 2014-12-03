define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      
      PlayService = require('./play.service'),
      CalendarService = require('./calendar.service'),
      UserService = require('./user.service'),

      module = angular.module('DataLayerModule', []);

  module.factory('dgCalendarService', CalendarService);
  module.factory('dgPlayService', PlayService);
  module.factory('dgUserService', UserService);
  
  return module;
});