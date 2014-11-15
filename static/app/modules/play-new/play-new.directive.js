define(function(require) {
  'use strict';

  var controller = require('./play-new.controller');

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