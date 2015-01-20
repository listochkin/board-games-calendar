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
      status: {
        isLoggedIn: $auth.isAuthenticated
      },
      currentUserResource: new User(),
      requestCurrentUser: function () {
        if (!!service.currentUserResource.data) {
          return $q.when(service.currentUserResource);
        } else {
          return service.currentUserResource.$getCurrent();
        }
      },
      register: $auth.signup,
      login: function (userData) {
        return $auth.login(userData).then(function(){
          service.requestCurrentUser();
        });
      },
      logout: function (redirectTo) {
        $auth.logout().then(function () {
          service.currentUserResource = new User();
          utils.redirect(redirectTo);
        });
      }
    };
    return service;
  }
});