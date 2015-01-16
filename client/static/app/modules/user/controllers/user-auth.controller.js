define(function(require) {
  'use strict';
  
  UserAuthController.$inject = ['$modalInstance', '$auth', 'toaster', 'dgUserService'];
  return UserAuthController;

  function UserAuthController($modalInstance, $auth, toaster, dgUserService) {
    var vm = this;

    vm.authenticate = authenticate;

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
  }
});