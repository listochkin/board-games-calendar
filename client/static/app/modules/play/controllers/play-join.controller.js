define(function(require) {
  'use strict';

  var _ = require('lodash');
  
  PlayJoinController.$inject = [
    '$rootScope', '$modalInstance', 'dgPlayService', 'dgUserService', 'playId'
  ];

  return PlayJoinController;

  function PlayJoinController($rootScope, $modalInstance, dgPlayService, dgUserService, playId) {
    var vm = this;
    
    vm.join = join;
    vm.leave = leave;
    vm.destroy = destroy;
    vm.isOrg = isOrg;
    vm.isPlayer = isPlayer;
    vm.isEmpty = isEmpty;
    vm.toggleDetails = toggleDetails;
    vm.isOwner = isOwner;
    vm.playData = undefined;
    vm.state = {
      isLoading: false,
      isDetailsOpen: false,
      alreadyJoined: false,
      limitReached: false
    };

    dgPlayService.getById(playId).then(function(data) {
      vm.playData = data;
      setIsPlayerJoined();
      $rootScope.$emit('dg:globalLoader:hide');
    });

    function join() {
      vm.state.isLoading = true;
      dgPlayService.join(playId)
        .then(onAfterJoinLeave)
        .catch(function() {
          vm.state.isLoading = false;
        });
    }

    function leave() {
      vm.state.isLoading = true;
      dgPlayService.leave(playId)
        .then(onAfterJoinLeave)
        .catch(function() {
          vm.state.isLoading = false;
        });
    }

    function onAfterJoinLeave(data) {
      vm.playData = data;
      setIsPlayerJoined();
      vm.state.isLoading = false;
    }

    function setIsPlayerJoined() {
      if (!vm.playData || !vm.playData.players || !dgUserService.currentUserResource.data) {
        return;
      }
      var users = _.first(vm.playData.players, function(player) {
        return player._id === dgUserService.currentUserResource.data._id;
      });
      vm.state.alreadyJoined = users.length > 0;
      vm.state.limitReached = vm.playData.playersMax <= vm.playData.players.length;
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

    function isOwner() {
      if (!dgUserService.currentUserResource.data || !vm.playData) {
        return false;
      }
      return dgUserService.currentUserResource.data._id === vm.playData.creator;
    }

    function destroy() {
      $rootScope.$emit('dg:globalLoader:show');
      dgPlayService.destroy(playId)
        .then(function() {
          $modalInstance.close();
          $rootScope.$emit('dg:globalLoader:hide');
          $rootScope.$emit('dg:play:reload');
        });
    }
  }
});