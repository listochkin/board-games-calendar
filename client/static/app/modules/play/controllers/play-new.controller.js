define(function(require) {
  'use strict';

  PlayNewController.$inject = [
    '$rootScope', '$modalInstance', 'dgPlayService', 'startDate', 'localStorageService'
  ];
  return PlayNewController;

  function PlayNewController($rootScope, $modalInstance, dgPlayService, startDate, localStorageService) {
    var vm = this;

    vm.onlyNumbers = /^\d+$/;
    vm.create = create;
    vm.cancel = cancel;
    vm.playData = dgPlayService.getNewData();
    vm.state = {
      isLoading: false
    };

    if (startDate) {
      dgPlayService.setDate(vm.playData, startDate);
    }

    var city = localStorageService.get('dgCity');
    if (city) {
      vm.playData.city = city;
    }

    function create() {
      if (!vm.create_game_form.$valid) {
        return;
      }
      vm.state.isLoading = true;
      dgPlayService.create(vm.playData)
        .then(function(data) {
          vm.state.isLoading = false;
          $rootScope.$emit('dg:plays:reload');
          $modalInstance.close();
          dgPlayService.join(data._id, data.creator);
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