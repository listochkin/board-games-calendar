define(function(require) {
  'use strict';
  
  CalendarController.$inject = ['$rootScope', '$scope', 'dgCalendarService'];
  return CalendarController;

  function CalendarController($rootScope, $scope, dgCalendarService) {
    var vm = this;
    
    vm.onDayClick = onDayClick;
    vm.onEventClick = onEventClick;
    vm.loadEvents = loadEvents;

    function onDayClick(date) {
      $rootScope.$emit('dg:play:new', date);
    }

    function onEventClick(game) {
      console.log('join');
      $rootScope.$emit('dg:play:join', game.id);
    }

    function loadEvents(start, end, timezone, callback) {
      dgCalendarService.getCalendarData(start, end).
      then(function(data) {
        callback(data);
      });
    }
  }
});