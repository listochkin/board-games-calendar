define(function(require) {
  'use strict';
  
  GamesListController.$inject = ['$scope', '$rootScope', 'dgGameService'];
  return GamesListController;

  function GamesListController($scope, $rootScope, dgGameService) {
    var vm = this;

    console.log('ololo');
    console.log(this.games, $scope.games);
    
    dgGameService.getGames().then(function(data) {
      vm.gamesListData = data;
      $rootScope.$emit('dg:globalLoader:hide');
    });

  }
});