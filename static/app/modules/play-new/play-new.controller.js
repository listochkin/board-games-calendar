define(function(require) {
  'use strict';
  
  PlayNewController.$inject = [
    '$rootScope', '$modalInstance', 'dgPlayService', 'startDate'
  ];
  return PlayNewController;

  function PlayNewController($rootScope, $modalInstance, dgPlayService, startDate) {
    var vm = this;
    
    vm.onlyNumbers = /^\d+$/;
    vm.create = create;
    vm.cancel = cancel;
    vm.playData = dgPlayService.getNewData();
    dgPlayService.setDate(vm.playData, startDate);

    function create() {
      if (!vm.create_game_form.$valid) {
        return;
      }
      console.log('add loader backdrop');
      dgPlayService.create(vm.playData).then(function() {
        $rootScope.$emit('dg:play:added');
        $modalInstance.close();
      });
    }

    function cancel() {
      $modalInstance.close();
    }
  }
});