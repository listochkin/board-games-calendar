define(function(require) {
  'use strict';

  return WishlistTimePickerController;

  function WishlistTimePickerController() {
    var vm = this;

    vm.periods = ['Сразу же', 'Ежедневно', 'Еженедельно'];
    vm.periods.selected = vm.selectedItem;
    vm.onSelectChange = onSelectChange;

    function onSelectChange(item) {
      vm.onChange({item: item});
    }
  }
});
