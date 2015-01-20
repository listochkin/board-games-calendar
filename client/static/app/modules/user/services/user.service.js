define(function (require) {
  'use strict';

  UserService.$inject = ['$resource', '$http'];
  return UserService;

  function UserService($resource, $http) {
    //TODO: check /api/users
    var User = $resource('/auth/:_id', {_id: '@_id'}, {
      update: {
        method: 'PUT'
      },
      'remove': {
        method: 'DELETE'
      },
      getCurrent: {
        params: {
          _id: 'me'
        }
      }
    });

    return {
      status: {
        isLoggedIn: false
      },
      data: {
        userName: 'test name',
        avatar: 'http://placehold.it/40x40'
      },
      register: register,
      login: login,
      current: User.getCurrent
    };

    function register(userData) {
      var user = new User(userData);
      return user.$save();
    }

    function login(email, password) {
      return $http.post('/auth/login', {
        email: email,
        password: password
      });
    }
  }
});