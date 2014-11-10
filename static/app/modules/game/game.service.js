define(function(require) {
  'use strict';

  GameService.$inject = ['$http', '$q'];
  return GameService;

  function GameService($http, $q) {
    var state = {},
      gameData = {};

    gameData = {
      img: 'http://placehold.it/240x160',
      name: '',
      start: '',
      playersMin: 0,
      playersMax: 0,
      where: ''
    };
    state.isCreateWindowOpened = false;

    return {
      gameData: gameData,
      create: create,
      createNewPlay: createNewPlay,
      state: state
    };

    function create() {

    }

    function createNewPlay(date) {
      gameData.start = date.toDate();
      state.isCreateWindowOpened = true;
    }
  }
});