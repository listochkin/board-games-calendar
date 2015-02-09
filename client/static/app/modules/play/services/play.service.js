define(function(require) {
  'use strict';

  PlayService.$inject = ['$resource', '$http'];
  return PlayService;

  function PlayService($resource, $http) {
    var Play = $resource('/api/plays/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      },
      'remove': {
        method: 'DELETE'
      }
    });

    var JoinPlay = $resource('/api/plays/:playId/join', {
      playId: '@playId'
    }, {
      'remove': {
        method: 'DELETE'
      }
    });

    return {
      getPlaysCount: getPlaysCount,
      getPlays: getPlays,
      getNewData: getNewData,
      setDate: setDate,
      create: create,
      update: update,
      destroy: destroy,
      getById: getById,
      join: join,
      leave: leave
    };

    function getPlays(options) {
      var playsList = Play.query(options);
      return playsList.$promise;
    }

    function getPlaysCount(options) {
      return $http({
        method: 'GET',
        url: '/api/plays/count',
        params: options
      });
    }

    function setDate(playData, date) {
      playData.when = date.toDate();
    }

    function getNewData() {
      return {
        img: 'http://placehold.it/290',
        name: '',
        when: '',
        playersMin: 0,
        playersMax: 0,
        city: ''
      };
    }

    function create(playData) {
      var play = new Play(playData);
      return play.$save();
    }

    function update(play) {
      return play.$update();
    }

    function destroy(playId) {
      var play = new Play({_id: playId});
      return play.$delete();
    }

    function getById(id) {
      return Play.get({id: id}).$promise;
    }

    function join(playId, userId) {
      var joinIns = new JoinPlay({playId: playId});
      return joinIns.$save();
    }

    function leave(playId, userId) {
      var joinIns = new JoinPlay({playId: playId});
      return joinIns.$remove();
    }
  }
});