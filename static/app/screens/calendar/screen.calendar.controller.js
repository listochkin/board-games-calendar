define(function(require) {
  'use strict';
  
  ScreenCalendarController.$inject = ['$scope'];
  return ScreenCalendarController;
  
  function ScreenCalendarController($scope) {
    $scope.onGameClick = onGameClick;

    function onGameClick(gameId) {
      //TODO: set service state open
      console.log('click:', gameId);
    }
  }
});