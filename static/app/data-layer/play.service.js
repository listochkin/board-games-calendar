define(function(require) {
  'use strict';

  GameService.$inject = ['$resource'];
  return GameService;

  function GameService($resource) {
    var Play = $resource('/api/play');

    return {
      getData: getData,
      setDate: setDate,
      create: create
    };

    function setDate(gameData, date) {
      gameData.start = date.toDate();
    }

    function getData() {
      return {
        img: 'http://placehold.it/240x160',
        name: '',
        start: '',
        playersMin: 0,
        playersMax: 0,
        where: ''
      };
    }

    function create(gameData) {
      var play = new Play(gameData);
      return play.$save();
    }
  }
});