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
        var message;
        switch (originalResponse.status) {
          case 401:
            return queue.pushRetryFn('unauthorized-server', function retryRequest() {
              return $injector.get('$http')(originalResponse.config);
            });
          case 405:
            message = getMessage(originalResponse.data.error);
            toaster.pop('warning', message.title, message.text);
            $rootScope.$emit('dg:globalLoader:hide');
            break;
          case 500:
            message = getMessage(originalResponse.data.error);
            toaster.pop('error', message.title, message.text);
            $rootScope.$emit('dg:globalLoader:hide');
            break;
        }
        return $q.reject(originalResponse);
      },
      'response': function(response) {
        if (response.data.success) {
          var message = getMessage(response.data.success);
          toaster.pop('success', message.title);
        }
        return response;
      }
    };
  }

  function getMessage(data) {
    var res = {title: 'Oups... Something went wrong...', text: []};
    if (!data) {
      return res;
    }
    if (angular.isString(data)) {
      res.text = data;
      return res;
    }
    if (data.message) {
      res.title = data.message;
    }
    if (data.errors) {
      angular.forEach(data.errors, function (err) {
        this.push(err.message);
      }, res.text);
      res.text.join(' ');
    }
    return res;
  }
});