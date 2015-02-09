define(function(require) {
  'use strict';

  PlayNewController.$inject = [
    '$rootScope', '$modalInstance', 'dgPlayService', 'startDate', 'localStorageService', '$location'
  ];
  return PlayNewController;

  function PlayNewController(
    $rootScope, $modalInstance, dgPlayService, startDate, localStorageService, $location
  ) {
    var vm = this;

    vm.onlyNumbers = /^\d+$/;
    vm.createOrUpdate = create;
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
      if (!vm.game_form.$valid) {
        return;
      }
      vm.state.isLoading = true;
      dgPlayService.create(vm.playData)
        .then(function(play) {
          return dgPlayService.join(play._id, play.creator);
        })
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