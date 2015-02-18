define(function (require) {
  'use strict';

  GamesListController.$inject = [
    'games', '$rootScope', '$location', '$route'
  ];
  getGamesData.$inject = ['$route', '$rootScope', 'BggResourceSearch'];

  GamesListController.resolver = {
    getGamesData: getGamesData
  };

  return GamesListController;

  function GamesListController(games, $rootScope, $location, $route) {
    $rootScope.$emit('dg:globalLoader:hide');

    var vm = this;
    vm.games = games;
    vm.descriptionLimit = 150;
    vm.search = $route.current.params.search;
    vm.doSearch = doSearch;
    vm.pagination = {
      itemsPerPage: 10,
      currentPage: 1,
      gamesCount: games ? games.length : 0
    };

    function doSearch(search) {
      $location.search({search: search});
    }
  }

  function getGamesData($route, $rootScope, BggResourceSearch) {
    $rootScope.$emit('dg:globalLoader:show');
    return BggResourceSearch.query({
      search: $route.current.params.search
    });
  }
});