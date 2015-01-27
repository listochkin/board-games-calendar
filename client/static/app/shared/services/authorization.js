define(function (require) {
  'use strict';

  getAuthorizationService.$inject = ['dgUserService', 'securityRetryQueue'];
  requireAuthenticatedUser.$inject = ['securityAuthorization'];

  function getAuthorizationService(dgUserService, queue) {
    var service = {
      // Require that there is an authenticated user
      // (use this in a route resolve to prevent non-authenticated users from entering that route)
      requireAuthenticatedUser: function () {
        return dgUserService.requestCurrentUser().then(function () {
          if (!dgUserService.status.isLoggedIn()) {
            return queue.pushRetryFn('unauthenticated-client', service.requireAuthenticatedUser);
          }
        });
      }
    };
    return service;
  }

  function requireAuthenticatedUser(securityAuthorization) {
    return securityAuthorization.requireAuthenticatedUser();
  }

  return {
    requireAuthenticatedUser: requireAuthenticatedUser,
    $get: getAuthorizationService
  };
});
