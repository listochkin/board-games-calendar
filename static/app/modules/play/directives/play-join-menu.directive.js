define(function(require) {
  'use strict';

  var angular = require('angular'),
      template = require('text!../templates/play-join-menu.tpl.html'),
      controller = require('../controllers/play-join-menu.controller');

  PlayJoinMenuDirective.$inject = [];
  return PlayJoinMenuDirective;

  function PlayJoinMenuDirective() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'dgPlayJoinMenuIns',
      bindToController: true,
      scope: false,
      controller: controller
    };
  }
});