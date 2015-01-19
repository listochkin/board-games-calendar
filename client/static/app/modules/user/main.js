define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      Directive = require('./directives/user-menu.directive'),
      UserService = require('./services/user.service'),

      //Auth
      loginTemplate = require('text!./templates/user-login.tpl.html'),
      registerTemplate = require('text!./templates/user-register.tpl.html'),
      AuthController = require('./controllers/user-auth.controller'),

      module = angular.module('UserMenuModule', []);

  module.factory('dgUserService', UserService);
  module.directive('dgUserMenu', Directive);

  initializer.$inject = ['$modal', '$rootScope'];
  module.run(initializer);

  return module;

  function initializer($modal, $rootScope) {
    $rootScope.$on('dg:user:register', openRegisterModal);
    $rootScope.$on('dg:user:login', openLoginModal);

    function openLoginModal() {
      $modal.open({
        template: loginTemplate,
        size: 'sm',
        controller: AuthController,
        controllerAs: 'authIns'
      });
    }

    function openRegisterModal() {
      $modal.open({
        template: registerTemplate,
        size: 'sm',
        controller: AuthController,
        controllerAs: 'authIns'
      });
    }
  }
});