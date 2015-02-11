define(function (require) {
  'use strict';

  var angular = require('angular'),
    template = require('text!../templates/bgg-boardgame-details.tpl.html'),
    controller = require('../controllers/bgg-boardgame-details.controller');

  dgBGGBoardgameDetails.$inject = [];
  return dgBGGBoardgameDetails;

  function dgBGGBoardgameDetails() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'dgBGGBoardgameDetails',
      bindToController: true,
      scope: {
        gameId: '@'
      },
      controller: controller
    };
  }
});