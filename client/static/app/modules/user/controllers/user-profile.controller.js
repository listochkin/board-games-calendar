define(function (require) {
  'use strict';

  UserProfileController.$inject = ['user'];
  getUser.$inject = ['dgUserService'];

  UserProfileController.resolver = {
    getUser: getUser
  };

  return UserProfileController;

  function UserProfileController(user) {
    var vm = this;
    vm.userData = user.data;
    vm.userData = {
      name: vm.userData.name,
      email: vm.userData.email,
      avatar: vm.userData.avatar,
      isConfirmed: vm.userData.isEmailConfirmed
    }
  }

  function getUser(dgUserService) {
    return dgUserService.requestCurrentUser();
  }
});