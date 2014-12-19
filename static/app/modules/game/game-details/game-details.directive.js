define(function(require) {
  'use strict';

  var angular = require('angular'),
      template = require('text!./game-details.tpl.html'),
      controller = require('./game-details.controller');

  GameDetailsDirective.$inject = [];
  return GameDetailsDirective;

  function GameDetailsDirective() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'dgGDetailsIns',
      bindToController: true,
      scope: {
        gameDetails: '=game'
      },
      controller: controller
    };
  }
});