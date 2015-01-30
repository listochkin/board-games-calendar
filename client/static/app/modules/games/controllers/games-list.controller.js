define(function(require) {
  'use strict';
  
  GamesListController.$inject = ['games', 'gamesCount', '$rootScope', '$location', '$route'];
  getGamesData.$inject = ['$route', '$rootScope', 'dgGameService'];
  getGamesCount.$inject = ['$route','$rootScope', 'dgGameService'];

  GamesListController.resolver = {
    getGamesData: getGamesData,
    getGamesCount: getGamesCount
  };

  return GamesListController;

  function GamesListController(games, gamesCount, $rootScope, $location, $route) {
    $rootScope.$emit('dg:globalLoader:hide');
    
    var vm = this,
        searchParams = $location.search();
    
    vm.games = games;
    vm.data = {};
    vm.data.search = searchParams.search;
    vm.data.currentPage = $route.current.params.pageId || 1;
    vm.doSearch = doSearch;
    vm.pageChanged = pageChanged;
    vm.gamesCount = gamesCount.data.count || 0;
    vm.showToggle = showToggle;

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

  function getGamesCount($route, $rootScope, dgGameService) {
    $rootScope.$emit('dg:globalLoader:show');

    return dgGameService.getGamesCount({
      search: $route.current.params.search
    });
  }
  function showToggle(){
    console.log(!!vm.gamesCount);
    return !!vm.gamesCount;
  }
});