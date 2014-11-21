define(function(require) {
  'use strict';

  var _ = require('lodash');
  
  PlayJoinController.$inject = [
    '$rootScope', '$modalInstance', 'dgPlayService', 'playId'
  ];
  return PlayJoinController;

  function PlayJoinController($rootScope, $modalInstance, dgPlayService, playId) {
    var vm = this;
    
    vm.join = join;
    vm.leave = leave;
    vm.isOrg = isOrg;
    vm.isPlayer = isPlayer;
    vm.isEmpty = isEmpty;
    vm.toggleDetails = toggleDetails;
    vm.state = {
      isLoading: false,
      isDetailsOpen: false,
      alreadyJoined: false,
      //TODO: work on it if limit players reached
      limitReached: false
    };

    dgPlayService.getById(playId).then(function(data) {
      vm.playData = data;
      setIsPlayerJoined();
    });

    function join() {
      vm.state.isLoading = true;

      console.log('add loader backdrop');
      //TODO: get current user id and pass it
      dgPlayService.join(playId, 123).then(onAfterJoinLeave);
    }

    function leave() {
      vm.state.isLoading = true;

      console.log('add loader backdrop');
      //TODO: get current user id and pass it
      dgPlayService.leave(playId, 123).then(onAfterJoinLeave);
    }

    function onAfterJoinLeave(data) {
      setIsPlayerJoined();
      vm.state.isLoading = false;
      
      //TODO: tmp!!!
      vm.state.alreadyJoined = true;
    }

    function setIsPlayerJoined() {
      if (!vm.playData || !vm.playData.players) {
        return;
      }
      var users = _.first(vm.playData.players, function(player) {
        //TODO: set ID of user
        return player.id === 55543;
      });
      vm.state.alreadyJoined = users.length > 0;
    }

    function toggleDetails() {
      vm.state.isDetailsOpen = !vm.state.isDetailsOpen;
    }

    function isOrg(player) {
      return player.type === 'org';
    }

    function isPlayer(player) {
      return player.type === 'player';
    }

    function isEmpty(player) {
      return player.type === 'empty';
    }
  }
});