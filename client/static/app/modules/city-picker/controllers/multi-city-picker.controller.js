define(function(require) {
  'use strict';

  MultiCityPickerController.$inject = ['$rootScope', 'dgCityPickerService'];
  return MultiCityPickerController;

  function MultiCityPickerController($rootScope, dgCityPickerService) {
    var vm = this;

    vm.selectedCities = vm.selectedItems || [];

    vm.getCities = getCities;
    vm.onSelectChange = onSelectChange;

    function getCities() {
      $rootScope.$emit('dg:globalLoader:show');

      dgCityPickerService.getCities()
        .then(function(data) {
          vm.cities = data.data;
          $rootScope.$emit('dg:globalLoader:hide');
        });
    }

    function onSelectChange(item, model) {
      vm.onChange({item: item, model: model, selected: vm.selectedCities});
    }
  }
});
