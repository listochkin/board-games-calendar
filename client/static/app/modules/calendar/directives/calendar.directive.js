define(function(require) {
  'use strict';

  var angular = require('angular'),
      template = require('text!../templates/calendar.directive.tpl.html'),
      controller = require('../controllers/calendar.controller'),
      $ = require('jquery');

  require('fullcalendar');

  CalendarDirective.$inject = ['UtilsService'];
  return CalendarDirective;

  function CalendarDirective(UtilsService) {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'dgCalendarIns',
      bindToController: true,
      scope: {},
      controller: controller,
      link: link
    };

    function link(scope, element, attr, ctrl) {
      $(element).fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title'
        },
        editable: true,
        eventLimit: true,
        timeFormat: 'h:mm',
        events: UtilsService.digestWrapper(ctrl.loadEvents),
        dayClick: UtilsService.digestWrapper(ctrl.onDayClick),
        eventClick: UtilsService.digestWrapper(ctrl.onEventClick)
      });

      ctrl.fullCalendar.refetchEvents = refetchEvents;

      function refetchEvents() {
        return $(element).fullCalendar('refetchEvents');
      }
    }
  }
});