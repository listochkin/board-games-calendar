define(function(require) {
  'use strict';

  GameService.$inject = ['$resource', '$q', '$timeout'];
  return GameService;

  function GameService($resource, $q, $timeout) {
    var Game = $resource('/api/games/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });

    return {
      getGames: getGames
    };

    function getGames(page, search) {
      var defer = $q.defer(),
          gamesList = Game.query({page: page, search: search});
      
      gamesList.$promise.then(function(games) {
        $timeout(function() {
          defer.resolve(games);
        }, 2000);
      });
      
      return defer.promise;
    }
  }
});