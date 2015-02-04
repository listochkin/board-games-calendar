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
          var message = getErrorMessage(originalResponse.data.error);
          toaster.pop('error', message.title, message.text);
          $rootScope.$emit('dg:globalLoader:hide');
        }
        return $q.reject(originalResponse);
      }
    };
  }

  function getErrorMessage(data) {
    if (!data) {
      return {title: 'Oups... Something went wrong...', text: ''};
    }
    var message = [],
        title = '';

    if (data.message) {
      title = data.message;
    }
    if (data.errors) {
      angular.forEach(data.errors, function(err) {
        message.push(err.message);
      });
    }
    return {
      title: title,
      text: message.join(' ')
    };
  }
});