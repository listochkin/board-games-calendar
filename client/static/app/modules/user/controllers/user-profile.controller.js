define(function (require) {
  'use strict';

  userProfileController.$inject = ['user'];
  getUser.$inject = ['dgUserService'];

  userProfileController.resolver = {
    getUser: getUser
  };

  return userProfileController;

  function userProfileController(user) {
    /*jshint validthis:true*/
    var vm = this;
    vm.user = user;
  }

  function getUser(dgUserService) {
    return dgUserService.requestCurrentUser();
  }
});