define(function(require) {
  'use strict';

  UserAuthController.$inject = [
    '$rootScope', '$modalInstance', '$auth', 'toaster', 'dgUserService', '$location'
    ];
  return UserAuthController;

  function UserAuthController($rootScope, $modalInstance, $auth, toaster, dgUserService, $location) {
    var vm = this;

    vm.authenticate = authenticate;
    vm.register = register;
    vm.login = login;
    vm.openRegister = openRegister;
    vm.openLogin = openLogin;
    vm.userData = {};

    function authenticate(provider) {
      $auth.authenticate(provider)
        .then(function() {
          toaster.pop('success', "You was successfully logged in as <User Name>");
          console.log('DONE', arguments);
          $modalInstance.close();
        })
        .catch(function() {
          console.log('ERROR:', arguments);
        });
    }

    function register() {
      if (!vm.register_form.$valid) {
        return;
      }
      dgUserService.register(vm.userData)
        .then(function() {
          $modalInstance.close();
        });
    }

    function login() {
      if (!vm.login_form.$valid) {
        return;
      }
      dgUserService.login(vm.userData)
          .then(function () {
            $modalInstance.close();
          });
    }

    function openRegister($event) {
      $event.preventDefault();
      $modalInstance.close();

      $rootScope.$emit('dg:user:register');
    }

    function openLogin($event) {
      $event.preventDefault();
      $modalInstance.close();

      $rootScope.$emit('dg:user:login');
    }
  }
});