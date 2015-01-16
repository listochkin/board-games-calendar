define(function(require) {
  'use strict';

  var angular = require('angular'),
      directive = require('./city-picker.directive'),
      module = angular.module('CityPickerModule', []);

  module.directive('dgCityPicker', directive);

  return module;
});
