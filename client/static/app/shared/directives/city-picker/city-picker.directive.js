define(function(require) {
  'use strict';

  var cityPickerTemplate = require('text!./city-picker.tpl.html'),
      controller = require('./city-picker.controller');

  CityPickerModule.$inject = ['$rootScope'];
  return CityPickerModule;

  function CityPickerModule($rootScope) {
    return {
      replace: true,
      restrict: 'E',
      template: cityPickerTemplate,
      controllerAs: 'dgCityPickerIns',
      controller: controller,
      scope: {}
    };
  }
});
