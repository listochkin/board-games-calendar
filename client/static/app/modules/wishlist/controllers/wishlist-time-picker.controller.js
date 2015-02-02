define(function(require) {
  'use strict';

  WishlistController.$inject = ['$rootScope'];
  return WishlistController;

  function WishlistController($rootScope) {
    var vm = this;

    vm.periods = ['Сразу же', 'Ежедневно', 'Еженедельно'];
    vm.onTimeSelect = onTimeSelect;

    function onTimeSelect() {
      console.log('#onTimeSelect');
    }
  }
});
