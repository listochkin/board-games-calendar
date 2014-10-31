define(function(require, module, config) {
    var angular = require('angular'),
        mocks = require('shared/mocks'),

        CalendarScreen = require('screens/calendar');

    require('angular-route');
    require('angular-bootstrap');

    var app = angular.module('Base', [])
    .config(['$locationProvider', '$provide', function($locationProvider, $provide) {
        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode(false);

        if (config.serverMocks) {
          $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator); 
        }
    }]);

  if (config.serverMocks) {
    app.run(mocks);
  }

  angular.bootstrap(document, [
    'ngRoute',
    'ui.bootstrap',
    
    app.name,
    CalendarScreen.name
  ]);
});