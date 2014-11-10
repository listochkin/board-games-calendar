define(function(require) {
  'use strict';
  
  ScreenCalendarController.$inject = ['$scope', 'dgGameService'];
  return ScreenCalendarController;
  
  function ScreenCalendarController($scope, dgGameService) {
    $scope.onGameClick = onGameClick;
    $scope.onCalendarClick = onCalendarClick;

    function onGameClick(gameId) {
      //TODO: set service state open
      console.log('click:', gameId);
    }

    function onCalendarClick(date) {
      dgGameService.createNewPlay(date);
    }
  }
});