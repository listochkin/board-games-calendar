define(function(require) {
  'use strict';

  var playNewTemplate = require('text!./play-new.tpl.html');
  
  PlayController.$inject = ['$scope', '$rootScope', '$modal',  'dgPlayService'];
  return PlayController;

  function PlayController($scope, $rootScope, $modal, dgPlayService) {
    //Public Events
    $rootScope.$on('dg:play:add', openCreateModal);
    $scope.onlyNumbers = /^\d+$/;
    $scope.create = create;
    $scope.cancel = cancel;

    function openCreateModal(options, date) {
      $scope.playData = dgPlayService.getData();
      dgPlayService.setDate($scope.playData, date);

      $scope.modalIns = $modal.open({
        template: playNewTemplate,
        scope: $scope,
        size: 'lg'
      });
    }

    function create() {
      console.log('add loader');
      dgPlayService.create($scope.playData)
      .then(function() {
        $rootScope.$emit('dg:play:added');
        $scope.modalIns.close();
      });
    }

    function cancel() {
      $scope.modalIns.close();
    }
  }
});