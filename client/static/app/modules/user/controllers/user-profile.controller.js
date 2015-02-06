define(function (require) {
  'use strict';

  UserProfileController.$inject = ['$scope', 'user', 'dgUserService'];
  getUser.$inject = ['dgUserService'];

  UserProfileController.resolver = {
    getUser: getUser
  };

  return UserProfileController;

  function UserProfileController($scope, user, dgUserService) {
    var vm = this;
    vm.userData = angular.copy(user.data);
    vm.userData.old_password = "";
    vm.userData.new_password = "";
    vm.userData.repeat_password = "";
    vm.userCashed = angular.copy(vm.userData);
    vm.submitDisabled = true;
    vm.profileValidate = profileValidate;
    vm.updateUser = updateUser;
    vm.cancel = cancel;
    vm.emailConfirmation = emailConfirmation;
    vm.passwordCheck = true;

    $scope.$watchCollection(function () {
      return vm.userData;
    }, function () {
      vm.profileValidate();
    });

    function passwordEquals() {
      if (vm.userData.new_password != vm.userData.repeat_password) {
        vm.passwordCheck = false;
        return false;
      } else {
        vm.passwordCheck = true;
        return true;
      }
    }
    function passwordEmptyCheck() {
      if (!vm.userData.new_password || !vm.userData.repeat_password) {
        return true;
      } else {
        return false;
      }
    }

    function passwordValidate() {
      if (!passwordEquals()  ||
          (passwordEquals() && !passwordEmptyCheck() && !vm.userData.old_password) ||
          (passwordEmptyCheck() && vm.userData.old_password)) {
        return false;
      }
      return true;
    }

    function profileValidate() {
      if (!passwordValidate() || angular.equals(vm.userCashed, vm.userData) ||
        vm.editProfile.$invalid) {
        vm.submitDisabled = true;
        return;
      }
      vm.submitDisabled = false;
    }

    function cancel() {
      angular.extend(vm.userData, vm.userCashed);
      vm.submitDisabled = true;
    }

    function updateUser() {
      dgUserService.update(vm.userData)
      .then(function(userData){
        vm.userData = angular.copy(userData.data);
        vm.userData.old_password = "";
        vm.userData.new_password = "";
        vm.userData.repeat_password = "";
        vm.userCashed = angular.copy(vm.userData);
        vm.submitDisabled = true;
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