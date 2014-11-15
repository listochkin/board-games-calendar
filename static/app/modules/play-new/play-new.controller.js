define(function(require) {
  'use strict';

  var gameNewTemplate = require('text!./play-new.tpl.html');
  
  GameController.$inject = ['$modal', '$scope', 'dgPlayService', '$rootScope'];
  return GameController;

  function GameController($modal, $scope, dgPlayService, $rootScope) {
    //Public Events
    $rootScope.$on('dg:play:add', openCreateModal);

    $scope.game = dgPlayService.gameData;
    $scope.onlyNumbers = /^\d+$/;

    function openCreateModal(options, date) {
      dgPlayService.setDate(date);

      var ins = $modal.open({
        template: gameNewTemplate,
        scope: $scope,
        size: 'lg'
      });

      ins.result.then(function (result) {
        
      }, function () {
        
      });
    }
  }
});