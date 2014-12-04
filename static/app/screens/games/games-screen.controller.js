define(function(require) {
  'use strict';
  
  GamesScreenController.$inject = ['gamesData', '$rootScope'];
  getGamesData.$inject = ['$route', '$rootScope', 'dgGameService'];

  GamesScreenController.resolver = {
    getGamesData: getGamesData
  };

  return GamesScreenController;

  function GamesScreenController(gamesData, $rootScope) {
    var vm = this;
    vm.gamesData = gamesData;

    console.log('DATA:', vm.gamesData);

    $rootScope.$emit('dg:globalLoader:hide');
  }

  function getGamesData($route, $rootScope, dgGameService) {
    $rootScope.$emit('dg:globalLoader:show');

    return dgGameService.getGames({
      page: $route.current.params.pageId,
      search: $route.current.params.search
    });
  }
});