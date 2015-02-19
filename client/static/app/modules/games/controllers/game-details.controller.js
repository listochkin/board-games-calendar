define(function (require) {
  'use strict';

  GamesDetailsController.$inject = [
    'game', '$rootScope'
  ];
  getGameData.$inject = ['$route', '$rootScope', 'BggResourceBoardgame'];

  GamesDetailsController.resolver = {
    getGameData: getGameData
  };

  return GamesDetailsController;

  function GamesDetailsController(game, $rootScope) {
    $rootScope.$emit('dg:globalLoader:hide');
    var vm = this;
    vm.game = game;
  }

  function getGameData($route, $rootScope, BggResourceBoardgame) {
    $rootScope.$emit('dg:globalLoader:show');
    return BggResourceBoardgame.getById($route.current.params.gameId);
  }
});