define(function(require) {
  'use strict';

  GameService.$inject = ['$resource', '$http', '$q'];
  return GameService;

  function GameService($resource, $http, $q) {
    var Game = $resource('/api/games/:_id', {_id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });

    return {
      getGames: getGames,
      getGame: getGame,
      deleteGame: deleteGame,
      saveGame: saveGame,
      getNewGame: getNewGame,
      createGame: createGame,
      getGamesCount: getGamesCount
    };

    function getGames(options) {
      var gamesList = Game.query({
            page: options.page,
            search: options.search
          });
      
      return gamesList.$promise;
    }

    function getGame(options) {
      var gameDetails = Game.get({_id: options.gameId});
      
      return gameDetails.$promise;
    }

    function deleteGame(game) {
      return game.$delete();
    }

    function saveGame(game) {
      return game.$update();
    }

    function getNewGame() {
      //TODO: add some default data
      return {};
    }

    function createGame(data) {
      var game = new Game(data);
          
      return game.$save();
    }

    function getGamesCount(data) {
      return $http({
        method: 'GET',
        url: '/api/games/count',
        params: {
          search: data.search
        }
      });
    }
  }
});