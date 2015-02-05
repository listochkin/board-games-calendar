define(function (require) {
  'use strict';

  UserProfileController.$inject = ['user', '$q', 'dgUserService'];
  getUser.$inject = ['dgUserService'];

  UserProfileController.resolver = {
    getUser: getUser
  };

  return UserProfileController;

  function UserProfileController(user, $q, dgUserService) {
    var vm = this;
    vm.userData = user.data;
    vm.userCashed = angular.extend({}, vm.userData);
    vm.submitDisabled = true;
    vm.dataChanged = dataChanged;
    vm.updateUser = updateUser;
    vm.cancel = cancel;
    vm.emailConfirmation = emailConfirmation;

    function dataChanged() {
      vm.submitDisabled = false;
    }

    function cancel() {
      angular.extend(vm.userData, vm.userCashed);
      vm.submitDisabled = true;
    }

    function updateUser() {
      $q.when(dgUserService.update())
      .then(function(user){
        vm.submitDisabled = true;
        vm.userData = user.data;
      });
    }

    function emailConfirmation() {
      console.log('confirmation send');
    }
  }
  function getUser(dgUserService) {
    return dgUserService.requestCurrentUser();
  }
});