define(function(require) {
  'use strict';
  
  GameDeleteController.$inject = ['game', '$modalInstance', 'dgGameService', '$location'];
  return GameDeleteController;

  function GameDeleteController(game, $modalInstance, dgGameService, $location) {
    var vm = this;
    vm.state = {
      isLoading: false
    };
    vm.confirmDelete = confirmDelete;
    vm.cancelDelete = cancelDelete;

    function confirmDelete() {
      vm.state.isLoading = true;

      dgGameService.deleteGame(game)
        .then(function() {
          $modalInstance.close();
          $location.path('/games');
        })
        .catch(function() {
          vm.state.isLoading = false;
        });
    }

    function cancelDelete() {
      $modalInstance.close();
    }
  }
});