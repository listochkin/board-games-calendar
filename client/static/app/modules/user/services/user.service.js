define(function(require) {
  'use strict';

  UserService.$inject = ['$resource', '$http'];
  return UserService;

  function UserService($resource, $http) {
    //TODO: check /api/users
    var User = $resource('/auth/:_id', {_id: '@_id'}, {
      update: {
        method: 'PUT',
      },
      'remove': {
        method: 'DELETE'
      },
      getCurrent: {
        url: '/user/current'
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
      console.log('Register user data', userData);

      var user = new User(userData);
      return user.$save();
    }

    function login(email, password) {
      console.log('login', email, password);
      
      return $http({
        method: 'POST',
        url: '/auth/login',
        params: {
          email: email,
          password: password
        }
      });
    }
  }
});