define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      pageListTemplate = require('text!./page-list.tpl.html'),
      pageDetailsTemplate = require('text!./page-details.tpl.html'),
      module = angular.module('PlaysScreen', []);

  PlaysScreen.$inject = ['$routeProvider'];
  module.config(PlaysScreen);

  return module;

  // add glyphicon glyphicon-fire

  function PlaysScreen($routeProvider) {
    $routeProvider
      .when('/plays', {
        template: pageListTemplate
      })
      .when('/plays/:playId', {
        template: pageDetailsTemplate
      });
  }
});