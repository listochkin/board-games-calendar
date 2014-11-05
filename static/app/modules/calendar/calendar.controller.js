define(function(require) {
  'use strict';
  
  CalendarController.$inject = ['dgCalendarService', '$scope'];
  return CalendarController;

  function CalendarController(dgCalendarService, $scope) {
    var vm = this;
    
    vm.onDayClick = onDayClick;
    vm.onEventClick = onEventClick;
    vm.loadEvents = loadEvents;

    function onDayClick() {
      console.log('day clicked');
    }

    function onEventClick(game) {
      $scope.onGameClick({gameId: game.id});
    }

    function loadEvents(start, end, timezone, callback) {
      dgCalendarService.getCalendarData(start, end).
      then(function(data) {
        callback(data);
      });
    }
  }
});