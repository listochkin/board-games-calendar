define(function (require) {
  'use strict';

  var angular = require('angular'),
      _ = require('lodash'),
      module = angular.module('UtilsModule', []);

  module.factory('UtilsService', UtilsService);
  UtilsService.$inject = ['$timeout', '$location'];

  return module;

  function UtilsService($timeout, $location) {
    return {
      digestWrapper: digestWrapper,
      redirect: redirect,
      setSelected: setSelected
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

    function setSelected(arr, sel) {
      var res = [];
      _.forEach(sel, function(item) {
        res.push(_.findWhere(arr, {_id: item._id}));
      });
      return res;
    }
  }
});