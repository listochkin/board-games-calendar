define(function() {
  'use strict';

  MultiCityPickerController.$inject = ['$rootScope', 'dgCityPickerService', 'UtilsService'];
  return MultiCityPickerController;

  function MultiCityPickerController($rootScope, dgCityPickerService, UtilsService) {
    var vm = this;

    vm.selectedCities = [];

    vm.getCities = getCities;
    vm.onSelectChange = onSelectChange;

    function getCities() {
      $rootScope.$emit('dg:globalLoader:show');

      dgCityPickerService.getCities()
        .then(function(data) {
          vm.cities = data.data;
          vm.selectedCities = UtilsService.setSelected(vm.cities, vm.selectedItems);
          $rootScope.$emit('dg:globalLoader:hide');
        });
    }

    function onSelectChange(item, model) {
      vm.onChange({item: item, model: model, selected: vm.selectedCities});
    }
  }
});
