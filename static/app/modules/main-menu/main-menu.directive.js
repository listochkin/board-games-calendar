define(function(require) {
  'use strict';

  var template = require('text!./main-menu.tpl.html'),
      controller = require('./main-menu.controller');

  return MainMenuDirective;

  function MainMenuDirective() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'dgMainMenuIns',
      bindToController: true,
      scope: false,
      controller: controller
    };
  }
});