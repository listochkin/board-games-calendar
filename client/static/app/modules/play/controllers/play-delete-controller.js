define(function (require) {
  'use strict';
  PlayDeleteController.$inject = ['$modalInstance'];
  return PlayDeleteController;

  function PlayDeleteController($modalInstance) {
    var vm = this;
    vm.state = {
      isLoading: false
    };
    vm.deletePlay = deletePlay;

    function deletePlay(confirm) {
      $modalInstance.close(confirm);
    }
  }
});
