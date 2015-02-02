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
    vm.user = user;
  }

  function getUser(dgUserService) {
    return dgUserService.requestCurrentUser();
  }
});