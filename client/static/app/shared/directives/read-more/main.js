define(function (require) {
  'use strict';

  var angular = require('angular'),
      directive = require('./read-more.directive'),
      module = angular.module('ReadMore', []);

  module.directive('dgReadMore', directive);

  return module;
});