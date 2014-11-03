define(function(require) {
  
  Controller.$inject = ['dgCalendarService'];
  return Controller;

  function Controller(dgCalendarService) {
    this.person = 'man';
    
    var vm = this;
    vm.onDayClick = onDayClick;
    vm.onEventClick = onEventClick;

    function onDayClick() {
      console.log('day clicked');
    }

    function onEventClick() {
      console.log('event click');
    }
  }
});