define(function(require) {
  'use strict';

  $ = require('jquery');

  PlayNewController.$inject = [
    '$rootScope', '$scope', '$modalInstance', 'dgPlayService', 'startDate'
  ];
  return PlayNewController;

  function PlayNewController($rootScope, $scope, $modalInstance, dgPlayService, startDate) {
    var vm = this;
    
    vm.onlyNumbers = /^\d+$/;
    vm.create = create;
    vm.cancel = cancel;
    vm.playData = dgPlayService.getNewData();
    vm.state = {
      isLoading: false
    };

    $scope.$watch(function(){
      return vm.playData.when;
    }, function() {
      $('input[name="game_date"]').blur();
    });

    if (startDate) {
      dgPlayService.setDate(vm.playData, startDate);
    }

    function create() {
      if (!vm.create_game_form.$valid) {
        return;
      }
      vm.state.isLoading = true;
      dgPlayService.create(vm.playData)
        .then(function() {
          vm.state.isLoading = false;
          $rootScope.$emit('dg:plays:reload');
          $modalInstance.close();
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