define(function(require) {
  'use strict';

  var deleteGameCtrl = require('./game-delete-controller'),
      removeConfirmTpl = require('text!../templates/game-remove-confirm.tpl.html');
  
  GamesDetailsController.$inject = ['game', '$rootScope', '$modal', '$scope'];
  getGameData.$inject = ['$route', '$rootScope', 'dgGameService'];

  GamesDetailsController.resolver = {
    getGameData: getGameData
  };

  return GamesDetailsController;

  function GamesDetailsController(game, $rootScope, $modal, $scope) {
    $rootScope.$emit('dg:globalLoader:hide');
    var vm = this;
    vm.game = game;
    vm.doDelete = doDelete;

    function doDelete() {
      vm.modalIns = $modal.open({
        size: 'sm',
        template: removeConfirmTpl,
        controller: deleteGameCtrl,
        controllerAs: 'ctrl',
        resolve: {
          game: function() {
            return game;
          }
        }
      });
    }

    $scope.$on('$destroy', function() {
      vm.modalIns.close();
    });
  }

  function getGameData($route, $rootScope, dgGameService) {
    $rootScope.$emit('dg:globalLoader:show');
    return dgGameService.getGame({
      gameId: $route.current.params.gameId
    });
  }
});