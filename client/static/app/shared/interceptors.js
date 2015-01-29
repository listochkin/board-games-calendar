define(function (require) {
  'use strict';

  var angular = require('angular'),
      securityRetryQueue = require('./services/retryQueue'),
      module = angular.module('InterceptorsModule', []);

  httpInterceptor.$inject = [
    '$q', '$injector', 'securityRetryQueue', 'toaster', '$rootScope'
  ];
  initializer.$inject = ['$httpProvider'];

  module.factory('securityRetryQueue', securityRetryQueue);
  module.config(initializer);

  return module;

  function initializer($httpProvider) {
    $httpProvider.interceptors.push(httpInterceptor);
  }

  function httpInterceptor($q, $injector, queue, toaster, $rootScope) {
    return {
      responseError: function (originalResponse) {
        if (originalResponse.status === 401) {
          return queue.pushRetryFn('unauthorized-server', function retryRequest() {
            return $injector.get('$http')(originalResponse.config);
          });
        }
        if (originalResponse.status === 500) {
          var message = originalResponse.data.error || 'Oups... Something went wrong...';
          toaster.pop('error', message);
          $rootScope.$emit('dg:globalLoader:hide');
        }
        return $q.reject(originalResponse);
      }
    };
  }
});