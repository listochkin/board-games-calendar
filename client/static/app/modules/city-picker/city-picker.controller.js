define(function (require) {
  'use strict';

  CityPickerController.$inject = ['$scope', '$rootScope', 'localStorageService'];
  return CityPickerController;

  function CityPickerController($scope, $rootScope, localStorageService) {
    var vm = this,
      selectedCity;

    vm.options = {
      country: 'ua',
      types: '(cities)'
    };
    vm.details = '';

    if ((selectedCity = localStorageService.get('dgCity'))) {
      vm.result = selectedCity.formatted_address;
    }

    $scope.$watch(function () {
      return vm.details;
    }, function (current) {
        if (vm.ngModel !== undefined) {
          vm.ngModel = current;
        }
        if (vm.publishEvent) {
          localStorageService.set('dgCity', current);
          $rootScope.$emit('dg:plays:reload');
        }
    });

    vm.setEmptyCity = function () {
      vm.result = null;
      vm.details = null;
    };
  }
});
