define(function(require) {
  'use strict';

  var cityPickerTemplate = require('text!./city-picker.tpl.html'),
      controller = require('./city-picker.controller');

  return CityPickerModule;

  function CityPickerModule() {
    return {
      replace: true,
      restrict: 'AE',
      template: cityPickerTemplate,
      controller: controller,
      controllerAs: 'dgCityPickerIns',
      bindToController: true,
      scope: {
        playDataCity: '=ngModel'
      },
      link: link
    };
    function link(scope, element, attrs, ctrl) {
      if (attrs.$attr.dgCityPicker) {
        ctrl.themeBootstrap = true;
      } else {
        ctrl.themeBootstrap = false;
      }
    }
  }
});
