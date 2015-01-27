define(function (require) {
  'use strict';

  var angular = require('angular'),
      securityRetryQueue = require('./services/retryQueue'),
      module = angular.module('InterceptorsModule', []);

  securityInterceptor.$inject = ['$q', '$injector', 'securityRetryQueue'];
  initializer.$inject = ['$httpProvider'];

  module.factory('securityRetryQueue', securityRetryQueue);
  module.config(initializer);

  return module;

  function initializer($httpProvider) {
    $httpProvider.interceptors.push(securityInterceptor);
  }

  function securityInterceptor($q, $injector, queue) {
    return {
      responseError: function (originalResponse) {
        if (originalResponse.status === 401) {
          return queue.pushRetryFn('unauthorized-server', function retryRequest() {
            return $injector.get('$http')(originalResponse.config);
          });
        }
        return $q.reject(originalResponse);
      }
    };
  }
});