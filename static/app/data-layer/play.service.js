define(function(require) {
  'use strict';

  GameService.$inject = ['$http', '$q'];
  return GameService;

  function GameService($http, $q) {
    var gameData = {};

    gameData = {
      img: 'http://placehold.it/240x160',
      name: '',
      start: '',
      playersMin: 0,
      playersMax: 0,
      where: ''
    };

    return {
      gameData: gameData,
      setDate: setDate
    };

    function setDate(date) {
      gameData.start = date.toDate();
    }
  }
});