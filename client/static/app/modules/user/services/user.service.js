define(function(require) {
  'use strict';

  UserService.$inject = ['$resource', '$q'];
  return UserService;

  function UserService($resource, $q) {
    var API = {
      status: {
        isLoggedIn: false
      },
      data: {
        userName: 'test name',
        avatar: 'http://placehold.it/40x40'
      }
    };

    API.register = register;

    return API;

    function register(userData) {
      console.log('Register user data', userData);
      var defer = $q.defer();
      defer.resolve({hello: 1});

      return defer.promise;
    }
  }
});