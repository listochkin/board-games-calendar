define(function(require) {
  'use strict';
  
  MainMenuController.$inject = ['$location', '$scope'];
  return MainMenuController;

  function MainMenuController($location, $scope) {
    var vm = this;
    vm.isActive = isActive;
    vm.currentPath = '';

    $scope.$on('$routeChangeSuccess', function(next, current) { 
      vm.currentPath = $location.path();
    });

    function isActive(page) {
      return vm.currentPath === page;
    }
  }
});