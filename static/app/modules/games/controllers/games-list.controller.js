define(function(require) {
  'use strict';
  
  GamesListController.$inject = ['games', '$rootScope', '$location'];
  getGamesData.$inject = ['$route', '$rootScope', 'dgGameService'];

  GamesListController.resolver = {
    getGamesData: getGamesData
  };

  return GamesListController;

  function GamesListController(games, $rootScope, $location) {
    $rootScope.$emit('dg:globalLoader:hide');
    var vm = this;
    vm.games = games;
    vm.data = {};

    var searchParams = $location.search();

    vm.data.search = searchParams.search;
    vm.doSearch = doSearch;

    function doSearch() {
      $location.search({search: vm.data.search, page: 1});
    }
  }

  function getGamesData($route, $rootScope, dgGameService) {
    $rootScope.$emit('dg:globalLoader:show');

    return dgGameService.getGames({
      page: $route.current.params.pageId,
      search: $route.current.params.search
    });
  }
});