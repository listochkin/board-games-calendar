define(function (require) {
  'use strict';

  var angular = require('angular'),
      Directive = require('./directives/user-menu.directive'),
      UserService = require('./services/user.service'),
  //Auth
      loginTemplate = require('text!./templates/user-login.tpl.html'),
      registerTemplate = require('text!./templates/user-register.tpl.html'),
      AuthController = require('./controllers/user-auth.controller'),
  //Profile
      userProfileController = require('./controllers/user-profile.controller'),
      userProfileTpl = require('text!./templates/user-profile.tpl.html'),
  //Secure
      securityRetryQueue = require('../../shared/services/retryQueue'),

      module = angular.module('UserMenuModule', []);

  module.factory('dgUserService', UserService);
  module.factory('securityRetryQueue', securityRetryQueue);

  module.directive('dgUserMenu', Directive);

  initializer.$inject = ['$modal', '$rootScope', 'dgUserService', 'securityRetryQueue', 'UtilsService'];
  userScreen.$inject = ['$routeProvider', 'securityAuthorizationProvider'];
  module.config(userScreen);
  module.run(initializer);

  return module;

  function initializer($modal, $rootScope, dgUserService, queue, utils) {
    var loginDialog = null;

    // Register a handler for when an item is added to the retry queue
    queue.onItemAddedCallbacks.push(function () {
      if (queue.hasMore()) {
        openLoginModal();
      }
    });

    $rootScope.$on('dg:user:register', openRegisterModal);
    $rootScope.$on('dg:user:login', openLoginModal);

    function openLoginModal() {
      loginDialog = $modal.open({
        template: loginTemplate,
        size: 'sm',
        controller: AuthController,
        controllerAs: 'authIns'
      });
      loginDialog.result.finally(onLoginDialogClose);
    }

    function onLoginDialogClose(success) {
      loginDialog = null;
      if (success) {
        queue.retryAll();
      } else {
        queue.cancelAll();
        utils.redirect();
      }
    }

    function openRegisterModal() {
      $modal.open({
        template: registerTemplate,
        size: 'sm',
        controller: AuthController,
        controllerAs: 'authIns'
      });
    }

    // Get the current user when the application starts
    // (in case they are still logged in from a previous session)
    dgUserService.requestCurrentUser();
  }

  function userScreen($routeProvider) {
    $routeProvider
      .when('/user/profile', {
        template: userProfileTpl,
        controllerAs: 'dgUserProfileIns',
        controller: userProfileController
      });
  }
});