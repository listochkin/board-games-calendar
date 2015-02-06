define(function(require) {
  'use strict';
  require('ng-autocomplete');

  var angular = require('angular'),
      directive = require('./city-picker.directive'),
      module = angular.module('CityPickerModule', ['ngAutocomplete']);

  module.directive('dgCityPicker', directive);

  return module;
});