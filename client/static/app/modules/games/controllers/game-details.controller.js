define(function(require) {
  'use strict';

  var deleteGameCtrl = require('./game-delete-controller'),
      removeConfirmTpl = require('text!../templates/game-remove-confirm.tpl.html');
  
  GamesDetailsController.$inject = [
    'game', 'dgGameService', 'dgUserService', '$rootScope', '$modal', '$scope', '$location'
  ];
  getGameData.$inject = ['$route', '$rootScope', 'dgGameService'];
  getNewGameData.$inject = ['dgGameService'];

  GamesDetailsController.resolver = {
    getGameData: getGameData,
    getNewGameData: getNewGameData
  };

  return GamesDetailsController;

  function GamesDetailsController(
    game, dgGameService, dgUserService, $rootScope, $modal, $scope, $location
  ) {
    
    $rootScope.$emit('dg:globalLoader:hide');
    var vm = this;
    vm.game = game;
    vm.doDelete = doDelete;
    vm.doSave = doSave;
    vm.isAdmin = dgUserService.isAdmin();

    function doDelete() {
      vm.modalIns = $modal.open({
        size: 'sm',
        template: removeConfirmTpl,
        controller: deleteGameCtrl,
        controllerAs: 'ctrl',
        resolve: {
          game: function() {
            return game;
          }
        }
      });
    }

    function doSave() {
      var promise;

      $rootScope.$emit('dg:globalLoader:show');
      if (vm.game._id) {
        promise = dgGameService.saveGame(vm.game); 
      } else {
        promise = dgGameService.createGame(vm.game);
      }
      promise.then(function(data) {
        vm.game = data;
        $location.path('/games/'+vm.game._id+'/mode/view');
      });
    }

    $scope.$on('$destroy', function() {
      if (vm.modalIns) {
        vm.modalIns.close();
      }
    });
  }

  function getGameData($route, $rootScope, dgGameService) {
    $rootScope.$emit('dg:globalLoader:show');
    return dgGameService.getGame({
      gameId: $route.current.params.gameId
    });
  }

  function getNewGameData(dgGameService) {
    return dgGameService.getNewGame();
  }
});