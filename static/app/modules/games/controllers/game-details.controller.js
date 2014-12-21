define(function(require) {
  'use strict';

  var removeConfirmTpl = require('text!../templates/game-remove-confirm.tpl.html');
  
  GamesDetailsController.$inject = ['game', '$rootScope', '$modal'];
  getGameData.$inject = ['$route', '$rootScope', 'dgGameService'];

  GamesDetailsController.resolver = {
    getGameData: getGameData
  };

  return GamesDetailsController;

  function GamesDetailsController(game, $rootScope, $modal) {
    $rootScope.$emit('dg:globalLoader:hide');
    var vm = this;
    vm.game = game;
    vm.doDelete = doDelete;

    console.log(vm.game);

    function doDelete() {
      var modalIns = $modal.open({
        template: removeConfirmTpl,
        size: 'sm',
        scope: $scope
      });

      $scope.confirmDelete = confirmDelete;
      $scope.cancelDelete = cancelDelete;
      $scope.modalIns = modalIns;
    }

    function confirmDelete() {
      console.log('confirned, hook to do delete');
    }

    function cancelDelete() {
      $scope.modalIns.close();
    }
  }

  function getGameData($route, $rootScope, dgGameService) {
    $rootScope.$emit('dg:globalLoader:show');
    return dgGameService.getGame({
      gameId: $route.current.params.gameId
    });
  }
});