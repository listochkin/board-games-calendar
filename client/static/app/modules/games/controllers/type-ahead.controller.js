define(function (require) {
    'use strict';

    TypeAheadController.$inject = ['dgGameService'];
    return TypeAheadController;

    function TypeAheadController(dgGameService) {
      var vm = this;
      vm.games = [];
      vm.getGames = getGames;
      vm.gameSelect = gameSelect;

      function getGames(query) {
        dgGameService.getGames({search: query}).then(function (data) {
          vm.games = data;
        });
      }

      function gameSelect(item) {
        vm.ngModel = item;
      }
    }
});

