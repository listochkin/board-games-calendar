define(function(require) {
  'use strict';
  
  UserMenuController.$inject = ['dgUserService'];
  return UserMenuController;

  function UserMenuController(dgUserService) {
    var vm = this;

    vm.status = {
      isOpen: false,
      user: dgUserService.status
    };
    vm.userData = dgUserService.data;

    vm.toggleMenu = toggleMenu;

    function toggleMenu($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.status.isOpen = !vm.status.isOpen; 
    }
  }
});