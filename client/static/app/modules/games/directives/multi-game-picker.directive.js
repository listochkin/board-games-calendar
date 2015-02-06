define(function(require) {
  'use strict';

  var multiGamePickerTemplate = require('text!../templates/multi-game-picker.tpl.html'),
    controller = require('../controllers/multi-game-picker.controller');

  return MultiGamePickerModule;

  function MultiGamePickerModule() {
    return {
      replace: true,
      restrict: 'E',
      template: multiGamePickerTemplate,
      controller: controller,
      controllerAs: 'dgMultiGamePickerIns',
      bindToController: true,
      scope: {
        onChange: '&',
        selectedItems: '='
      }
    };
  }
});
