define(function(require) {
  'use strict';
  
  GamesListController.$inject = ['$location', 'dgGameService'];
  return GamesListController;

  function GamesListController($location, dgGameService) {
    var vm = this;
    vm.data = {};

    var searchParams = $location.search();

    vm.data.search = searchParams.search;
    vm.doSearch = doSearch;

    function doSearch() {
      $location.search({search: vm.data.search, page: 1});
    }
  }
});