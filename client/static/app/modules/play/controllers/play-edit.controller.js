define(function(require) {
  'use strict';

  PlayEditController.$inject = [
    'playId', '$rootScope', '$modalInstance', 'dgPlayService', '$location'
  ];
  return PlayEditController;

  function PlayEditController(playId, $rootScope, $modalInstance, dgPlayService, $location) {
    var vm = this;

    vm.onlyNumbers = /^\d+$/;
    vm.createOrUpdate = update;
    vm.cancel = cancel;
    vm.state = {
      isLoading: false
    };

    dgPlayService.getById(playId).then(function(data) {
      vm.playData = data;
      $rootScope.$emit('dg:globalLoader:hide');
    });

    function update() {
      if (!vm.game_form.$valid) {
        return;
      }
      vm.state.isLoading = true;
      dgPlayService.update(vm.playData)
        .then(function(play) {
          vm.state.isLoading = false;
          $rootScope.$emit('dg:plays:reload');
          $modalInstance.close();
          $location.search('playId', play._id);
        })
        .catch(function() {
          vm.state.isLoading = false;
        });
    }

    function cancel() {
      $modalInstance.close();
    }
  }
});