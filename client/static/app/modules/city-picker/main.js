define(function(require) {
  'use strict';

  var angular = require('angular'),

      directive = require('./city-picker.directive'),
      CityPickerService = require('./city-picker.service'),

      module = angular.module('CityPickerModule', []);

  module.directive('dgCityPicker', directive);
  module.factory('dgCityPickerService', CityPickerService);

  return module;
});
