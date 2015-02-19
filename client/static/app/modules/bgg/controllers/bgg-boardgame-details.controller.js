define(function (require) {
  'use strict';

  BggBoardgameDetailsController.$inject = ['BggResourceBoardgame'];
  return BggBoardgameDetailsController;

  function BggBoardgameDetailsController(bgBggResourceBoardgame) {
    var vm = this;
    bgBggResourceBoardgame.getById(vm.gameId).then(function (BoardGame) {
      vm.game = BoardGame;
      vm.gameCategory = BoardGame.getCategories();
    });
  }
});