define(function(require) {
  'use strict';
  
  GameDeleteController.$inject = ['$modalInstance', 'dgGameService'];
  return GameDeleteController;

  function GameDeleteController($modalInstance, dgGameService) {
    var vm = this;
    vm.state = {
      isLoading: false
    };
    vm.confirmDelete = confirmDelete;
    vm.cancelDelete = cancelDelete;

    function confirmDelete() {
      vm.state.isLoading = true;
      console.log('confirned, hook to do delete');
    }

    function cancelDelete() {
      $modalInstance.close();
    }
  }
});