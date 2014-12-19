define(function(require) {
  'use strict';
  
  GamesScreenController.$inject = ['objData', '$rootScope'];
  getGamesData.$inject = ['$route', '$rootScope', 'dgGameService'];

  GamesScreenController.resolver = {
    getGamesData: getGamesData,
    getGameData: getGameData
  };

  return GamesScreenController;

  function GamesScreenController(objData, $rootScope) {
    var vm = this;
    vm.objData = objData;

    $rootScope.$emit('dg:globalLoader:hide');
  }

  function getGamesData($route, $rootScope, dgGameService) {
    $rootScope.$emit('dg:globalLoader:show');

    return dgGameService.getGames({
      page: $route.current.params.pageId,
      search: $route.current.params.search
    });
  }

  function getGameData($route, $rootScope, dgGameService) {
    $rootScope.$emit('dg:globalLoader:show');
    return dgGameService.getGame({
      gameId: $route.current.params.gameId
    });
  }
});