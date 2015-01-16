define(function(require) {
  'use strict';
  
  UserMenuController.$inject = ['$rootScope', 'dgUserService'];
  return UserMenuController;

  function UserMenuController($rootScope, dgUserService) {
    var vm = this;

    vm.status = {
      isOpen: false,
      user: dgUserService.status
    };
    vm.userData = dgUserService.data;
    vm.login = login;
    vm.toggleMenu = toggleMenu;

    function login($event) {
      $event.preventDefault();
      $rootScope.$emit('dg:user:login');
    }

    function toggleMenu($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.status.isOpen = !vm.status.isOpen; 
    }
  }
});