define(function(require) {
  'use strict';

  MultiCityPickerController.$inject = ['$rootScope', 'dgCityPickerService', 'localStorageService'];
  return MultiCityPickerController;

  function MultiCityPickerController($rootScope, dgCityPickerService, localStorageService) {
    var vm = this;

    vm.selectedCities = [];

    vm.getCities = getCities;
    vm.onCitySelect = onCitySelect;

    //var selectedCities = localStorageService.get('dgCities');
    //if (selectedCities) {
    //  vm.cities.selected = selectedCities;
    //}

    function getCities() {
      $rootScope.$emit('dg:globalLoader:show');
      dgCityPickerService.getCities()
        .then(function(data) {
          vm.cities = data.data;
          $rootScope.$emit('dg:globalLoader:hide');
        });
    }

    function onCitySelect(item, model) {
      console.log('#onCitySelect');
      console.log(vm.selectedCities);
    }
  }
});
