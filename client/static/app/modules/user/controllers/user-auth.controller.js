define(function(require) {
  'use strict';
  
  UserAuthController.$inject = [
    '$rootScope', '$modalInstance', '$auth', 'toaster', 'dgUserService'
    ];
  return UserAuthController;

  function UserAuthController($rootScope, $modalInstance, $auth, toaster, dgUserService) {
    var vm = this;

    vm.authenticate = authenticate;
    vm.register = register;
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

    function register($event) {
      $event.preventDefault();
      if (!vm.register_form.$valid) {
        return;
      }
      dgUserService.register(vm.userData)
        .then(function() {
          //TODO: authendificate
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