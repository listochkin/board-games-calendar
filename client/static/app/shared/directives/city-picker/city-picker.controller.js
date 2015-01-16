define(function(require) {
  'use strict';

  CityPickerController.$inject = ['$rootScope', '$scope'];
  return CityPickerController;

  function CityPickerController($rootScope, $scope) {
    var vm = this;
    vm.city = {};
    vm.cities = [
      {name: 'Odessa'},
      {name: 'Kiev'}
    ];
    $scope.$on('$cityChangeSuccess', function(next, current) {
      //something happens
    });
  }
});
