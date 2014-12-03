define(function(require) {
  'use strict';

  UserService.$inject = ['$resource'];
  return UserService;

  function UserService($resource) {
    var API = {
      status: {
        isLoggedIn: true
      },
      data: {
        userName: 'test name',
        avatar: 'http://placehold.it/40x40'
      }
    };

    return API;
  }
});