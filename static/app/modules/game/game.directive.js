define(function(require) {
  'use strict';

  var controller = require('./game.controller');

  GameDirective.$inject = [];
  return GameDirective;

  function GameDirective() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div></div>',
      scope: false,
      controller: controller
    };
  }
});