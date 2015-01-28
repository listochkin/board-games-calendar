define(function(require) {
  'use strict';

  CityPickerController.$inject = ['$rootScope', 'dgCityPickerService'];
  return CityPickerController;

  function CityPickerController($rootScope, dgCityPickerService) {
    var vm = this;
    vm.city = {};

    vm.getCities = getCities;
    vm.onCitySelect = onCitySelect;

    function getCities() {
      $rootScope.$emit('dg:globalLoader:show');
      dgCityPickerService.getCities()
      .then(function(data) {
        $rootScope.$emit('dg:globalLoader:hide');
        vm.cities = data.data;
      });
    }

    function onCitySelect(data) {
      // console.log(data);
    }

  }
});