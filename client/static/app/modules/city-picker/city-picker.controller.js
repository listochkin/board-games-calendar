define(function(require) {
  'use strict';

  CityPickerController.$inject = ['$rootScope', 'dgCityPickerService', 'localStorageService'];
  return CityPickerController;

  function CityPickerController($rootScope, dgCityPickerService, localStorageService) {
    var vm = this;
    vm.city = {};

    vm.themeBootstrap = true;
    vm.getCities = getCities;
    vm.onCitySelect = onCitySelect;
    vm.onCitySelectByCreatePlay = onCitySelectByCreatePlay;
    
    var selectedCity = localStorageService.get('dgCity');
    if (selectedCity) {
      vm.city.selected = {name: selectedCity};  
    }

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

    function onCitySelectByCreatePlay(data) {
        vm.playDataCity = data.name;
    }
  }
});
