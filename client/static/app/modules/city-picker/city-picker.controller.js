define(function(require) {
  'use strict';

  CityPickerController.$inject = ['$rootScope', 'dgCityPickerService', 'localStorageService'];
  return CityPickerController;

  function CityPickerController($rootScope, dgCityPickerService, localStorageService) {
    var vm = this;
    vm.city = {};

    vm.getCities = getCities;
    vm.onCitySelect = onCitySelect;
    vm.city.selected = {name: localStorageService.get('dgCity')};

    function getCities() {
      $rootScope.$emit('dg:globalLoader:show');
      dgCityPickerService.getCities()
        .then(function(data) {
          vm.cities = data.data;
          $rootScope.$emit('dg:globalLoader:hide');
        });
    }

    function onCitySelect(data) {
      if (!data) {
        localStorageService.remove('dgCity');
      } else {
        localStorageService.set('dgCity', data.name);  
      }
      $rootScope.$emit('dg:plays:reload');
    }
  }
});
