define(function(require) {
  'use strict';

  var cityPickerTemplate = require('text!./city-picker.tpl.html'),
      cityPickerTemplate_1 = require('text!./city-picker-attribute-type.tpl.html'),
      controller = require('./city-picker.controller');

  return CityPickerModule;

  function CityPickerModule() {
    return {
      replace: true,
      restrict: 'AE',
      template: function(element, attrs) {
        if (attrs.$attr.dgCityPicker) {
          return cityPickerTemplate_1;
        } else {
          return cityPickerTemplate;
        }
      },
      controller: controller,
      controllerAs: 'dgCityPickerIns',
      scope: false
    };
  }
});
