define(function(require) {
  'use strict';

  var template = require('text!../templates/game-picker.tpl.html'),
    controller = require('../controllers/game-picker.controller');

  return GamePickerModule;

  function GamePickerModule() {
    return {
      replace: true,
      restrict: 'E',
      template: template,
      controller: controller,
      controllerAs: 'dgGamePickerIns',
      scope: false
    };
  }
});
