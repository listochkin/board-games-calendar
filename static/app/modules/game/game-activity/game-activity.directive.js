define(function(require) {
  'use strict';

  var angular = require('angular'),
      template = require('text!./game-activity.tpl.html'),
      controller = require('./game-activity.controller');

  GameActivityDirective.$inject = [];
  return GameActivityDirective;

  function GameActivityDirective() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'dgGActivityIns',
      bindToController: true,
      scope: {
        gameId: '=gameId'
      },
      controller: controller
    };
  }
});