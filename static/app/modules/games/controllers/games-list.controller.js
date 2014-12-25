define(function(require) {
  'use strict';
  
  GamesListController.$inject = ['games', '$rootScope', '$location', '$route'];
  getGamesData.$inject = ['$route', '$rootScope', 'dgGameService'];

  GamesListController.resolver = {
    getGamesData: getGamesData
  };

  return GamesListController;

  function GamesListController(games, $rootScope, $location, $route) {
    $rootScope.$emit('dg:globalLoader:hide');
    
    var vm = this,
        searchParams = $location.search();
    
    vm.games = games;
    vm.data = {};
    vm.data.search = searchParams.search;
    vm.data.currentPage = $route.current.params.pageId || 1;
    vm.doSearch = doSearch;
    vm.pageChanged = pageChanged;

    function doSearch() {
      $location.search({search: vm.data.search, page: 1});
    }

    function pageChanged() {
      $location.path('/games/page/'+vm.data.currentPage);
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