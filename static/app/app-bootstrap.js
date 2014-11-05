define(function(require, exports, module) {
  'use strict';

  var angular = require('angular'),
      MocksConfig = require('shared/mocks-config'),
      HandleErrors = require('shared/errors'),
      RoutingConfig = require('shared/routing-config'),

      UtilsModule = require('shared/utils'),

      MainMenu = require('modules/main-menu'),
      CalendarScreen = require('screens/calendar');

  require('angular-route');
  require('angular-bootstrap');

  var app = angular.module('Base', [
    UtilsModule.name,
    CalendarScreen.name,
    MainMenu.name
  ])
  .config(RoutingConfig)
  .run(HandleErrors);

  if (module.config().serverMocks) {
    app.config(['$provide', function($provide) {
      $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator); 
    }]);
    app.run(MocksConfig);
  }

  angular.bootstrap(document, [
    'ngRoute',
    'ui.bootstrap',

    app.name
  ]);
});