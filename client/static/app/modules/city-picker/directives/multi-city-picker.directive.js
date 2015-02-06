define(function(require) {
  'use strict';

  var multiCityPickerTemplate = require('text!../templates/multi-city-picker.tpl.html'),
    controller = require('../controllers/multi-city-picker.controller');

  return MultiCityPickerModule;

  function MultiCityPickerModule() {
    return {
      replace: true,
      restrict: 'E',
      template: multiCityPickerTemplate,
      controller: controller,
      controllerAs: 'dgMultiCityPickerIns',
      bindToController: true,
      scope: {
        onChange: '&',
        selectedItems: '='
      }
    };
  }
});
