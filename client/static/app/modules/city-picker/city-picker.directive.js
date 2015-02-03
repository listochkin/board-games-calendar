define(function(require) {
  'use strict';

  var cityPickerTemplate = require('text!./city-picker.tpl.html'),
      cityPickerAttributeTypeTemplate = require('text!./city-picker-attribute-type.tpl.html'),
      controller = require('./city-picker.controller');

  return CityPickerModule;

  function CityPickerModule() {
    return {
      replace: true,
      restrict: 'AE',
      template: function(element, attrs) {
        if (attrs.$attr.dgCityPicker) {
          return cityPickerAttributeTypeTemplate;
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
