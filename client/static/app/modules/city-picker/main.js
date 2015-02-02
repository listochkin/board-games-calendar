define(function(require) {
  'use strict';

  var angular = require('angular'),

      MultiCityPickerDirective = require('./directives/multi-city-picker.directive'),
      CityPickerDirective = require('./directives/city-picker.directive'),
      CityPickerService = require('./city-picker.service'),

      module = angular.module('CityPickerModule', []);

  module.directive('dgCityPicker', CityPickerDirective);
  module.directive('dgMultiCityPicker', MultiCityPickerDirective);
  module.factory('dgCityPickerService', CityPickerService);

  return module;
});
