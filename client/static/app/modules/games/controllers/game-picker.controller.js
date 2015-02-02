define(function(require) {
  'use strict';

  GamePickerController.$inject = ['$rootScope', 'dgGameService'];
  return GamePickerController;

  function GamePickerController($rootScope, dgGameService) {
    var vm = this;
    vm.selectedGames = {};

    vm.getGames = getGames;
    vm.onCitySelect = onCitySelect;

    function getGames() {
      $rootScope.$emit('dg:globalLoader:show');

      dgGameService.getGames()
        .then(function(data) {
          $rootScope.$emit('dg:globalLoader:hide');
          vm.games = data.data;
        });
    }

    function onCitySelect(data) {
      // console.log(data);
    }

  }
});
