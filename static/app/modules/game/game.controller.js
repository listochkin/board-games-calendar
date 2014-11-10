define(function(require) {
  'use strict';

  var gameNewTemplate = require('text!./templates/game-new.tpl.html');
  
  GameController.$inject = ['$modal', '$scope', 'dgGameService'];
  return GameController;

  function GameController($modal, $scope, dgGameService) {
    $scope.game = dgGameService.gameData;
    $scope.onlyNumbers = /^\d+$/;

    $scope.$watch(function() {
      return dgGameService.state.isCreateWindowOpened;
    }, openCreateModal);

    function openCreateModal(state) {
      if (!state) {
        return;
      }
      var modalInstance = $modal.open({
        template: gameNewTemplate,
        scope: $scope,
        size: 'lg'
      });  

      modalInstance.result.then(function (result) {
        dgGameService.state.isCreateWindowOpened = false;
      }, function () {
        dgGameService.state.isCreateWindowOpened = false;
      });
    }
  }
});