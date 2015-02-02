define(function(require) {
  'use strict';
  
  CalendarController.$inject = ['$rootScope', '$scope', 'dgCalendarService', 'localStorageService'];
  return CalendarController;

  function CalendarController($rootScope, $scope, dgCalendarService, localStorageService) {
    var vm = this;

    vm.scope = $scope;
    vm.scope.date = '';
    vm.title = '';
    vm.onDayClick = onDayClick;
    vm.onEventClick = onEventClick;
    vm.loadEvents = loadEvents;
    vm.editDateToggle = true;

    //All fullcalendar method are declared in directive
    vm.fullCalendar = {};

    vm.scope.$watch('date', function (newValue, oldValue) {
      if (newValue) {
        vm.fullCalendar.goToDate();
      }
    });

    $rootScope.$on('dg:plays:reload', reloadEvents);

    function onDayClick(date) {
      $rootScope.$emit('dg:play:new', date);
    }

    function onEventClick(game) {
      $rootScope.$emit('dg:play:join', game.id);
    }

    function loadEvents(start, end, timezone, callback) {
      $rootScope.$emit('dg:globalLoader:show');
      var cityFilter = localStorageService.get('dgCity');
      dgCalendarService.getCalendarData(start, end, cityFilter)
        .then(function(data) {
          $rootScope.$emit('dg:globalLoader:hide');
          callback(data);
        });
    }

    function reloadEvents() {
      vm.fullCalendar.refetchEvents();
    }
  }
});