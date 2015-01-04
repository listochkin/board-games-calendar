define(function() {
  'use strict';

  var angular = require('angular'),
      module = angular.module('InterceptorsModule', []);

  GlobalAjaxErrorHandler.$inject = ['$rootScope', 'toaster'];
  initializer.$inject = ['$httpProvider'];

  module.config(initializer);
  
  return module;  

  function initializer($httpProvider) {
    $httpProvider.interceptors.push(GlobalAjaxErrorHandler);
  }

  function GlobalAjaxErrorHandler($rootScope, toaster) {
    return {
      responseError: function(response) {
        var message;
        //TODO: add dev check
        if (response.data && response.data.error) {
          message = response.data.error;
        } else {
          message = 'Something goes wrong...';
        }
        toaster.pop('error', "Oups...", message);
        $rootScope.$emit('dg:globalLoader:hide');

        return response;
      }
    };
  }
});