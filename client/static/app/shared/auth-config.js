define(function(require) {
  'use strict';

  authConfig.$inject = ['$authProvider'];
  return authConfig;


  function authConfig($authProvider) {
    $authProvider.loginRedirect = false;
    $authProvider.logoutRedirect = false;
    $authProvider.signupUrl = '/auth';
    $authProvider.facebook({
      clientId: '913314548708920'
    });

    $authProvider.google({
      clientId: '97381065107-r57l3q78nkdv39pbub59tt2ndt0jdk1u.apps.googleusercontent.com'
    });
  }
});