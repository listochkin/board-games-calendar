define(function (require) {
  'use strict';

  BGGSearchController.$inject = ['BggResourceSearch'];
  return BGGSearchController;

  function BGGSearchController(bgBggResourceSearch) {
    var vm = this;
    bgBggResourceSearch.query({search: 'манчкин'}).then(function (BoardGames) {
      vm.result = BoardGames;
    });

  }
});