define(function(require) {
  'use strict';

  var cityPickerTemplate = require('text!./city-picker.tpl.html'),
      controller = require('./city-picker.controller');

  return CityPickerModule;

  function CityPickerModule() {
    return {
      replace: true,
      restrict: 'E',
      template: cityPickerTemplate,
      controller: controller,
      controllerAs: 'dgCityPickerIns',
      scope: false
    };
  }
});
