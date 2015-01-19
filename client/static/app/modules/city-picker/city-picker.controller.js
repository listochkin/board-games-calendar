define(function(require) {
  'use strict';

  CityPickerController.$inject = ['$rootScope', '$scope', 'dgCityPickerService'];
  return CityPickerController;

  function CityPickerController($rootScope, $scope, dgCityPickerService) {
    var vm = this;
    vm.city = {};

    vm.getCities = getCities;
    vm.onCitySelect = onCitySelect;

    function getCities(data) {
      $rootScope.$emit('dg:globalLoader:show');
      dgCityPickerService.getCities().
      then(function(data) {
        $rootScope.$emit('dg:globalLoader:hide');
        vm.cities = data;
      });
    }

    function onCitySelect(data) {
      // console.log(data);
    }



  }
});
