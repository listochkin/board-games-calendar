define(function(require, exports, module) {
  'use strict';

  var angular = require('angular'),
      MocksConfig = require('utils/mocks-config'),
      HandleErrors = require('utils/errors'),
      RoutingConfig = require('utils/routing-config'),
      UtilsModule = require('utils/utils'),
      
      CalendarScreen = require('screens/calendar'),

      //Shared directives
      ButtonLoader = require('directives/button-loader'),
      LoadingLocker = require('directives/loading-locker'),

      //Data layer
      DataLayerModule = require('data-layer'),

      //Modules
      MainMenu = require('modules/main-menu'),
      CalendarModule = require('modules/calendar'),
      PlayNewModule = require('modules/play-new'),
      PlayJoinModule = require('modules/play-join');

  require('angular-route');
  require('angular-resource');
  require('angular-bootstrap');
  require('angular-datepicker');

  var app = angular.module('Base', [
    CalendarScreen.name,
    UtilsModule.name,
    DataLayerModule.name,
    MainMenu.name,
    CalendarModule.name,
    PlayNewModule.name,
    PlayJoinModule.name,
    ButtonLoader.name,
    LoadingLocker.name
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
    'ngResource',
    'ui.bootstrap',
    'datePicker',

    app.name
  ]);
});