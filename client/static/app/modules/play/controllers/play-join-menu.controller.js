define(function(require) {
  'use strict';
  
  PlayJoinMenuController.$inject = ['$rootScope'];
  return PlayJoinMenuController;

  function PlayJoinMenuController($rootScope) {
    var vm = this;
    vm.onBtnClick = onBtnClick;

    function onBtnClick($event) {
      $event.preventDefault();
      $rootScope.$emit('dg:play:new');
    }
  }
});