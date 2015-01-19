define(function (require) {
  'use strict';

  userProfileController.$inject = ['user'];

  return userProfileController;

  function userProfileController(user) {

    var vm = this;
    vm.user = user;  }
});