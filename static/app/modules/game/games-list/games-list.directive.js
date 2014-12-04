define(function(require) {
  'use strict';

  var angular = require('angular'),
      template = require('text!./games-list.tpl.html'),
      controller = require('./games-list.controller');

  GamesListDirective.$inject = [];
  return GamesListDirective;

  function GamesListDirective() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'dgGListIns',
      bindToController: true,
      scope: {
        games: '='
      },
      controller: controller
    };
  }
});