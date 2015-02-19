define(function () {
  'use strict';

  var angular = require('angular'),
      module = angular.module('UtilsModule', []);

  module.factory('UtilsService', UtilsService);
  module.filter('cutText', cutText);
  module.filter('slice', slice);

  UtilsService.$inject = ['$timeout', '$location'];

  return module;

  function UtilsService($timeout, $location) {
    return {
      digestWrapper: digestWrapper,
      redirect: redirect,
      cutText: cutText
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

  function cutText() {
    return function (value, max, tail, wordwise) {
      if (!value) {
        return '';
      }

      max = parseInt(max, 10);
      if (!max) {
        return value;
      }
      if (value.length <= max) {
        return value;
      }

      value = value.substr(0, max);
      //wordwise (boolean) - if true, cut only by words bounds
      if (wordwise) {
        var lastSpace = value.lastIndexOf(' ');
        if (lastSpace != -1) {
          value = value.substr(0, lastSpace);
        }
      }

      return value + (tail || '…');
    };
  }

  function slice() {
    return function (inputArray, selectedPage, pageSize) {
      if (inputArray) {
        var start = (selectedPage - 1) * pageSize;
        return inputArray.slice(start, start + pageSize);
      }
    };
  }
});