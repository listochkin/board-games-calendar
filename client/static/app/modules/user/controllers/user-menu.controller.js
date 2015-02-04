define(function (require) {
  'use strict';

  UserMenuController.$inject = ['$rootScope', 'dgUserService', '$scope'];
  return UserMenuController;

  function UserMenuController($rootScope, dgUserService, $scope) {
    var vm = this;

    vm.status = {
      isOpen: false
    };

    vm.login = login;
    vm.toggleMenu = toggleMenu;
    vm.logout = logout;
    vm.user = undefined;

    $scope.$watch(function() {
      return dgUserService.currentUserResource.data;
    }, function (userData) {
      vm.user = userData;
    });

    function login($event) {
      $event.preventDefault();
      vm.status.isOpen = false;
      $rootScope.$emit('dg:user:login');
    }

    function logout($event) {
      $event.preventDefault();
      dgUserService.logout();
    }

    function toggleMenu($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.status.isOpen = !vm.status.isOpen;
    }
  }
});