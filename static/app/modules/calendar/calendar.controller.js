define(function(require) {
  'use strict';
  
  Controller.$inject = ['dgCalendarService'];
  return Controller;

  function Controller(dgCalendarService) {
    var vm = this;
    //TODO: remove it, just to show how to use
    this.person = 'man';
    
    vm.onDayClick = onDayClick;
    vm.onEventClick = onEventClick;
    vm.loadEvents = loadEvents;

    function onDayClick() {
      console.log('day clicked');
    }

    function onEventClick() {
      console.log('event click');
    }

    function loadEvents(start, end, timezone, callback) {
      dgCalendarService.getCalendarData(start, end).
      then(function(data) {
        callback(data);
      });
    }
  }
});