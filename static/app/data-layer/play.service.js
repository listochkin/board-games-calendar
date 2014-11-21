define(function(require) {
  'use strict';

  GameService.$inject = ['$resource', '$q', '$timeout'];
  return GameService;

  function GameService($resource, $q, $timeout) {
    var Play = $resource('/api/play/:id', {id: '@_id'}, {
      update: {
        method: 'PUT' // this method issues a PUT request
      }
    });

    return {
      getNewData: getNewData,
      setDate: setDate,
      create: create,
      getById: getById,
      join: join
    };

    function setDate(gameData, date) {
      gameData.start = date.toDate();
    }

    function getNewData() {
      return {
        img: 'http://placehold.it/290x160',
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

    function getById(id) {
      var defer = $q.defer();
      
      Play.get({id: id}, function(playObj) {
        defer.resolve(playObj);
      });

      return defer.promise;
    }

    function join(gameId, userId) {
      var defer = $q.defer();

      //TODO: add real code
      $timeout(function() {
        defer.resolve();
      }, 5000);

      return defer.promise;
    }
  }
});