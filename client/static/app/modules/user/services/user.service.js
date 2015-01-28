define(function (require) {
  'use strict';

  UserService.$inject = ['$resource', '$q', '$auth', '$location', 'UtilsService'];
  return UserService;

  function UserService($resource, $q, $auth, $location, utils) {
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

    var service = {
      isLoggedIn: $auth.isAuthenticated,
      currentUserResource: new User(),
      requestCurrentUser: requestCurrentUser,
      register: $auth.signup,
      login: login,
      logout: logout
    };
    return service;

    function logout(redirectTo) {
      $auth.logout().then(function () {
        service.currentUserResource = new User();
        utils.redirect(redirectTo);
      });
    }

    function login(userData) {
      return $auth.login(userData).then(requestCurrentUser);
    }

    function requestCurrentUser() {
      if (!!service.currentUserResource.data) {
        return $q.when(service.currentUserResource);
      } else {
        return service.currentUserResource.$getCurrent();
      }
    }
  }
});