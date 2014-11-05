define(function() {
  'use strict';

  var angular = require('angular'),
      module = angular.module('UtilsModule', []);

  module.factory('UtilsService', UtilsService);
  UtilsService.$inject = ['$timeout'];
  
  return module;

  function UtilsService($timeout) {
    return {
      digestWrapper: digestWrapper
    };

    function digestWrapper(functionToWrap) {
      return wrapper;
      function wrapper() {
        var args = arguments;
        $timeout(function(){
          functionToWrap.apply(functionToWrap, args);
        });
      }
    }
  }

});