define(function(require) {
  'use strict';

  PlayService.$inject = ['$resource'];
  return PlayService;

  function PlayService($resource) {
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
      getNewData: getNewData,
      setDate: setDate,
      create: create,
      destroy: destroy,
      getById: getById,
      join: join,
      leave: leave
    };

    function setDate(playData, date) {
      playData.when = date.toDate();
    }

    function getNewData() {
      return {
        img: 'http://placehold.it/290x160',
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