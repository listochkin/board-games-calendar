define(function(require) {
  'use strict';
  
  CalendarController.$inject = ['$rootScope', '$scope', 'dgCalendarService'];
  return CalendarController;

  function CalendarController($rootScope, $scope, dgCalendarService) {
    var vm = this;
    
    vm.onDayClick = onDayClick;
    vm.onEventClick = onEventClick;
    vm.loadEvents = loadEvents;
    //All fullcalendar method are declared in directive
    vm.fullCalendar = {};

    $rootScope.$on('dg:play:added', reloadEvents);

    function onDayClick(date) {
      $rootScope.$emit('dg:play:new', date);
    }

    function onEventClick(game) {
      $rootScope.$emit('dg:play:join', game.id);
    }

    function loadEvents(start, end, timezone, callback) {
      $rootScope.$emit('dg:globalLoader:show');
      dgCalendarService.getCalendarData(start, end).
      then(function(data) {
        $rootScope.$emit('dg:globalLoader:hide');
        callback(data);
      });
    }

    function reloadEvents() {
      vm.fullCalendar.refetchEvents();
    }
  }
});