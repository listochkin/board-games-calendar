define(function (require) {
  'use strict';

  UserAuthController.$inject = [
    '$rootScope', '$modalInstance', '$auth', 'toaster', 'dgUserService'
  ];
  return UserAuthController;

  function UserAuthController($rootScope, $modalInstance, $auth, toaster, dgUserService) {
    var vm = this;

    vm.authenticate = authenticate;
    vm.register = register;
    vm.login = login;
    vm.openRegister = openRegister;
    vm.openLogin = openLogin;
    vm.userData = {};

    function authenticate(provider) {
      $rootScope.$emit('dg:globalLoader:show');
      $auth.authenticate(provider)
        .then(function () {
          return dgUserService.requestCurrentUser();
        })
        .then(function(user) {
          toaster.pop('success', "You were successfully logged in as "+user.data.name);
          $modalInstance.close(true);
        })
        .catch(function () {
          $modalInstance.close(false);
        }).
        finally(function() {
          $rootScope.$emit('dg:globalLoader:hide');
        });
    }

    function register() {
      if (!vm.register_form.$valid) {
        return;
      }
      dgUserService.register(vm.userData)
        .then(function (success) {
          $modalInstance.close(success);
        });
    }

    function login() {
      if (!vm.login_form.$valid) {
        return;
      }
      dgUserService.login(vm.userData)
        .then(function (success) {
          $modalInstance.close(success);
        });
    }

    function openRegister($event) {
      $event.preventDefault();
      $modalInstance.close(false);

      $rootScope.$emit('dg:user:register');
    }

    function openLogin($event) {
      $event.preventDefault();
      $modalInstance.close(false);

      $rootScope.$emit('dg:user:login');
    }
  }
});