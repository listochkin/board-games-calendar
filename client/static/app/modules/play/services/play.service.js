define(function(require) {
  'use strict';

  PlayService.$inject = ['$resource', '$q', '$timeout'];
  return PlayService;

  function PlayService($resource, $q, $timeout) {
    var Play = $resource('/api/plays/:id', {id: '@_id'}, {
      update: {
        method: 'PUT',
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
        where: ''
      };
    }

    function create(playData) {
      var play = new Play(playData);
      return play.$save();
    }

    function getById(id) {
      var defer = $q.defer();
      
      Play.get({id: id}, function(playObj) {
        defer.resolve(playObj);
      });

      return defer.promise;
    }

    function join(playId, userId) {
      var joinIns,
          defer = $q.defer();

      joinIns = new JoinPlay({playId: playId});
      joinIns.$save().then(function(data) {
        //TODO: remove timeout
        $timeout(function() {
          defer.resolve(data);
        }, 5000);
      });

      return defer.promise;
    }

    function leave(playId, userId) {
      var joinIns,
          defer = $q.defer();

      joinIns = new JoinPlay({playId: playId});
      joinIns.$remove().then(function(data) {
        //TODO: remove timeout
        $timeout(function() {
          defer.resolve(data);
        }, 5000);
      });

      return defer.promise;
    }
  }
});