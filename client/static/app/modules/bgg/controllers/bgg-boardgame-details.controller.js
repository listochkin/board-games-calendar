define(function (require) {
  'use strict';

  BGGBoardgameDetailsController.$inject = ['BGGResourceBoardgame'];
  return BGGBoardgameDetailsController;

  function BGGBoardgameDetailsController(BGGResourceBoardgame) {
    var vm = this;
    BGGResourceBoardgame.getById(vm.gameId).then(function (BoardGame) {
      vm.game = BoardGame;
    });
  }
});