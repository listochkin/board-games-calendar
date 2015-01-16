define(function(require, exports, module) {
  'use strict';

  var angular = require('angular'),
      MocksConfig = require('shared/mocks-config'),
      UtilsModule = require('shared/utils'),
      InterceoptorsModule = require('shared/interceptors'),
      AuthConfig = require('shared/auth-config'),

      //Modules
      ButtonLoader = require('shared/directives/button-loader'),
      GlobalLoader = require('shared/directives/global-loader'),
      LoadingLocker = require('shared/directives/loading-locker'),
      MainMenu = require('modules/main-menu'),
      CalendarModule = require('modules/calendar'),
      PlayModule = require('modules/play'),
      GamesModule = require('modules/games'),
      UserModule = require('modules/user');

  require('angular-route');
  require('angular-resource');
  require('angular-bootstrap');
  require('angular-datepicker');
  require('angular-animate');
  require('angular-toaster');
  require('angular-satellizer');

  var app = angular.module('Base', [
    UtilsModule.name,
    InterceoptorsModule.name,
    MainMenu.name,
    CalendarModule.name,
    PlayModule.name,
    ButtonLoader.name,
    LoadingLocker.name,
    GlobalLoader.name,
    UserModule.name,
    GamesModule.name
  ])
  .config(AuthConfig)
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(false);
  }]);

  if (module.config().serverMocks) {
    app.config(['$provide', function($provide) {
      $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator); 
    }]);
    app.run(MocksConfig);
  }

  angular.bootstrap(document, [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ui.bootstrap',
    'datePicker',
    'toaster',
    'satellizer',

    app.name
  ]);
});