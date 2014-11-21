define(function(require) {
  'use strict';
  
  PlayJoinController.$inject = [
    '$rootScope', '$modalInstance', 'dgPlayService', 'playId'
  ];
  return PlayJoinController;

  function PlayJoinController($rootScope, $modalInstance, dgPlayService, playId) {
    var vm = this;
    
    vm.join = join;
    vm.cancel = cancel;
    vm.toggleDetails = toggleDetails;
    vm.state = {
      isLoading: false,
      isDetailsOpen: false
    };

    dgPlayService.getById(playId).then(function(data) {
      console.log(data);
      vm.playData = data;
      vm.state.isDetailsOpen = false;
    });

    function join() {
      vm.state.isLoading = true;
      
      console.log('add loader backdrop');
      //TODO: get current user id
      dgPlayService.join().then(function() {
        $rootScope.$emit('dg:play:joined');
        $modalInstance.close();
      });
    }

    function cancel() {
      $modalInstance.close();
    }

    function toggleDetails() {
      vm.state.isDetailsOpen = !vm.state.isDetailsOpen;
    }
  }
});