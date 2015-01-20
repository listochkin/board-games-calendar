define(function () {
  'use strict';

  var angular = require('angular'),
      module = angular.module('UtilsModule', []);

  module.factory('UtilsService', UtilsService);
  UtilsService.$inject = ['$timeout', '$location'];

  return module;

  function UtilsService($timeout, $location) {
    return {
      digestWrapper: digestWrapper,
      redirect: redirect
    };
    function redirect(url) {
      url = url || '/calendar';
      $location.path(url);
    }

    function digestWrapper(functionToWrap) {
      return wrapper;
      function wrapper() {
        var args = arguments;
        $timeout(function () {
          functionToWrap.apply(functionToWrap, args);
        });
      }
    }
  }
});