define(function (require) {
  'use strict';

  var angular = require('angular'),
    template = require('text!../templates/bgg-boardgame-details.tpl.html'),
    controller = require('../controllers/bgg-boardgame-details.controller');

  BggBoardgameDetails.$inject = [];
  return BggBoardgameDetails;

  function BggBoardgameDetails() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'dgBggBoardgameDetails',
      bindToController: true,
      scope: {
        gameId: '@'
      },
      controller: controller
    };
  }
});