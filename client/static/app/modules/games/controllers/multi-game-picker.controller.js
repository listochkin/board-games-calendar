define(function(require) {
  'use strict';

  MultiGamePickerController.$inject = ['$rootScope', 'dgGameService'];
  return MultiGamePickerController;

  function MultiGamePickerController($rootScope, dgGameService) {
    var vm = this;

    vm.selectedGames = vm.selectedItems || [];

    vm.getGames = getGames;
    vm.onSelectChange = onSelectChange;

    function getGames() {
      $rootScope.$emit('dg:globalLoader:show');

      dgGameService.getGames({
        page: null,
        search: null
      })
      .then(function(data) {
        vm.games = data;
        $rootScope.$emit('dg:globalLoader:hide');
      });
    }

    function onSelectChange(item, model) {
      vm.onChange({item: item, model: model, selected: vm.selectedCities});
    }
  }
});
