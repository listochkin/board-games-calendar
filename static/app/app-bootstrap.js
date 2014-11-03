define(function(require, exports, module) {
  var angular = require('angular'),
      mocks = require('shared/mocks'),
      HandleErrors = require('shared/errors'),
      RoutingConfig = require('shared/routing-config'),

      CalendarScreen = require('screens/calendar');

  require('angular-route');
  require('angular-bootstrap');

  var app = angular.module('Base', [
    CalendarScreen.name
  ])
  .config(RoutingConfig)
  .run(HandleErrors);

  //Fake mock data
  //TODO: refactor it
  if (module.config().serverMocks) {
    app.config(['$provide', function($provide) {
      $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator); 
    }]);
    app.run(mocks);
  }

  angular.bootstrap(document, [
    'ngRoute',
    'ui.bootstrap',

    app.name
  ]);
});