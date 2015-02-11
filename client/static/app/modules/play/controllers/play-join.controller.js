define(function(require) {
  'use strict';

  var moment = require('moment'),
           _ = require('lodash'),
      deletePlayCtrl = require('./play-delete-controller'),
      removeConfirmTpl = require('text!../templates/play-remove-confirm.tpl.html');

  PlayJoinController.$inject = [
    'playId', '$rootScope', '$modalInstance', 'dgPlayService', 'dgUserService', '$modal', '$location'
  ];

  return PlayJoinController;

  function PlayJoinController(playId, $rootScope, $modalInstance, dgPlayService, dgUserService, $modal, $location) {
    var vm = this;

    vm.join = join;
    vm.leave = leave;
    vm.doDelete = doDelete;
    vm.isPlayer = isPlayer;
    vm.edit = edit;
    vm.toggleDetails = toggleDetails;
    vm.isOwner = isOwner;
    vm.isAdmin = dgUserService.isAdmin();
    vm.playData = undefined;
    vm.state = {
      isLoading: false,
      isDetailsOpen: true,
      alreadyJoined: false,
      limitReached: false
    };

    dgPlayService.getById(playId).then(function(data) {
      vm.playData = data;
      setPlayDateFormat();
      setIsPlayerJoined();
      $rootScope.$emit('dg:globalLoader:hide');
    });

    function setPlayDateFormat() {
      if (!vm.playData.when) {
        return;
      }
      var dateTime = moment(vm.playData.when).toDate();
      vm.playData.when = moment(dateTime).format('DD/MM/YYYY hh:mm');
    }

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
      setPlayDateFormat();
      vm.state.isLoading = false;
    }

    function setIsPlayerJoined() {
      if (!vm.playData || !vm.playData.players || !dgUserService.currentUserResource.data) {
        return;
      }
      var user = _.find(vm.playData.players, function(player) {
        return player._id === dgUserService.currentUserResource.data._id;
      });
      vm.state.alreadyJoined = !!user;
      vm.state.limitReached = vm.playData.playersMax <= vm.playData.players.length;
    }

    function toggleDetails() {
      vm.state.isDetailsOpen = !vm.state.isDetailsOpen;
    }

    function isPlayer(player) {
      return dgUserService.currentUserResource.data._id === player._id;
    }

    function isOwner() {
      if (!dgUserService.currentUserResource.data || !vm.playData) {
        return false;
      }
      return dgUserService.currentUserResource.data._id === vm.playData.creator._id;
    }

    function doDelete() {
      vm.modalIns = $modal.open({
        size: 'sm',
        template: removeConfirmTpl,
        controller: deletePlayCtrl,
        controllerAs: 'ctrl'
      });
      vm.modalIns.result.then(function(success){
        if(!success) return;
        vm.state.isLoading = true;
        dgPlayService.destroy(playId)
          .then(function(success) {
            $modalInstance.close(success);
            $rootScope.$emit('dg:globalLoader:hide');
            $location.url('/plays');
            $rootScope.$emit('dg:plays:reload');
          })
          .catch(function() {
            vm.state.isLoading = false;
          });
      });
    }

    function edit() {
      $modalInstance.close();
      $rootScope.$emit('dg:play:edit', vm.playData._id);
    }
  }
});