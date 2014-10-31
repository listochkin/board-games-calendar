define(function(require) {
  var angular = require('angular'),
      controller = require('./controller'),
      pageTemplate = require('text!./page.tpl.html'),

      //Init Screen
      module = angular.module('CalendarScreen', [
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