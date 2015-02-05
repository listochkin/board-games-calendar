define(function (require) {
  'use strict';

  UserService.$inject = ['$resource', '$q', '$auth', 'UtilsService'];
  return UserService;

  function UserService($resource, $q, $auth, utils) {
    //TODO: check /api/users
    var User = $resource('/auth/:_id', {_id: '@_id'}, {
      update: {
        method: 'PUT',
        params: {
          _id: 'me'
        }
      },
      'remove': {
        method: 'DELETE'
      },
      getCurrent: {
        params: {
          _id: 'me'
        }
      },
      isUniqueEmail: {
        method: 'POST',
        params: {
          _id: 'isUniqueEmail'
        }
      }
    });

    var service = {
      isLoggedIn: $auth.isAuthenticated,
      isAdmin: isAdmin,
      currentUserResource: new User(),
      requestCurrentUser: requestCurrentUser,
      update: update,
      register: register,
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

    function register(userData) {
      return $auth.signup(userData).then(requestCurrentUser);
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

    function isAdmin(user) {
      return !!(user && user.role === 'admin');
    }

    function update() {
      return service.currentUserResource.$update();
    }
  }
});