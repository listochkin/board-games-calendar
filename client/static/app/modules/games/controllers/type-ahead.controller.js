define(function (require) {
    'use strict';
    var angular = require('angular');

    TypeAheadController.$inject = ['BggResourceSearch'];
    return TypeAheadController;

    function TypeAheadController(dgBggResourceSearch) {
      var vm = this,
          limit = 10;
      vm.games = [];
      vm.getGames = getGames;
      vm.gameSelect = gameSelect;

      function getGames(query) {
        dgBggResourceSearch.query({search: query}).then(function (data) {
          vm.games = angular.isArray(data) ? data.slice(0, limit) : data;
        });
      }

      function gameSelect(item) {
        vm.ngModel = item;
      }
    }
});

