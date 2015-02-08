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
    vm.userData = angular.extend({
      oldPassword: '',
      newPassword: '',
      repeatPassword: ''
    }, user.data);
    vm.userCashed = angular.copy(vm.userData);
    vm.submitDisabled = true;
    vm.profileValidate = profileValidate;
    vm.updateUser = updateUser;
    vm.cancel = cancel;
    vm.emailConfirmation = emailConfirmation;
    vm.passwordCheck = true;

    $scope.$watch(function() {
      return vm.userData;
    }, function () {
      vm.profileValidate();
    }, true);

    function arePasswordsEqual() {
      return (vm.passwordCheck =
        (vm.userData.newPassword === vm.userData.repeatPassword));
    }
    function passwordEmptyCheck() {
      return !!(!vm.userData.newPassword || !vm.userData.repeatPassword);
    }

    function passwordValidate() {
      return !(!arePasswordsEqual() ||
      (arePasswordsEqual() && !passwordEmptyCheck() && !vm.userData.oldPassword) ||
      (passwordEmptyCheck() && vm.userData.oldPassword));
    }

    function profileValidate() {
      vm.submitDisabled = !!(!passwordValidate() ||
        angular.equals(vm.userCashed, vm.userData) ||
        vm.editProfile.$invalid);
    }

    function cancel() {
      angular.extend(vm.userData, vm.userCashed);
      vm.submitDisabled = true;
    }

    function updateUser() {
      dgUserService.update(vm.userData)
        .then(function(userData){
        vm.userData = angular.extend({
          oldPassword: '',
          newPassword: '',
          repeatPassword: ''
        },userData.data);
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