define(function() {
  'use strict';

  MultiGamePickerController.$inject = ['$rootScope', 'dgGameService', 'UtilsService'];
  return MultiGamePickerController;

  function MultiGamePickerController($rootScope, dgGameService, UtilsService) {
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
        vm.selectedGames = UtilsService.setSelected(vm.games, vm.selectedItems);
        $rootScope.$emit('dg:globalLoader:hide');
      });
    }

    function onSelectChange(item, model) {
      vm.onChange({item: item, model: model, selected: vm.selectedGames});
    }
  }
});
