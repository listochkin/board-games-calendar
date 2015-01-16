define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      Directive = require('./directives/user-menu.directive'),
      UserService = require('./services/user.service'),

      //Auth
      LoginTemplate = require('text!./templates/user-login.tpl.html'),
      AuthController = require('./controllers/user-auth.controller'),

      module = angular.module('UserMenuModule', []);

  module.factory('dgUserService', UserService);
  module.directive('dgUserMenu', Directive);

  initializer.$inject = ['$modal', '$rootScope'];
  module.run(initializer);

  return module;

  function initializer($modal, $rootScope) {
    $rootScope.$on('dg:user:login', openLoginModal);

    function openLoginModal() {
      $modal.open({
        template: LoginTemplate,
        size: 'sm',
        controller: AuthController,
        controllerAs: 'authIns'
      });
    }
  }
});