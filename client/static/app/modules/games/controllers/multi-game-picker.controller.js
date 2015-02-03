define(function(require) {
  'use strict';

  MultiGamePickerController.$inject = ['$rootScope', 'dgGameService'];
  return MultiGamePickerController;

  function MultiGamePickerController($rootScope, dgGameService) {
    var vm = this;
    vm.selectedGames = [];

    vm.getGames = getGames;
    vm.onGameSelect = onGameSelect;

    //var selectedCities = localStorageService.get('dgCities');
    //if (selectedCities) {
    //  vm.cities.selected = selectedCities;
    //}

    function getGames() {
      $rootScope.$emit('dg:globalLoader:show');

      dgGameService.getGames({
        page: null,
        search: null
      })
        .then(function(data) {
          vm.games = data.splice(-2, 2);
          console.log(vm.games);
          $rootScope.$emit('dg:globalLoader:hide');
        });
    }

    function onGameSelect(item, model) {
      console.log('#onCitySelect');
      console.log(vm.selectedGames);
    }
  }
});
