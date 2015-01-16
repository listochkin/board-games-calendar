define(function(require) {
  'use strict';

  authConfig.$inject = ['$authProvider'];
  return authConfig;


  function authConfig($authProvider) {
    $authProvider.facebook({
      clientId: '913314548708920'
    });

    $authProvider.google({
      clientId: '97381065107-bj70unj8r7io0sqauj46ejq6296e36uh.apps.googleusercontent.com'
    });
  }
});