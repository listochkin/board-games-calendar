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
      getCalendarElement().fullCalendar({
        header: {
          left: 'prev,next today'
        },
        editable: true,
        eventLimit: true,
        timeFormat: 'h:mm',
        events: UtilsService.digestWrapper(ctrl.loadEvents),
        dayClick: UtilsService.digestWrapper(ctrl.onDayClick),
        eventClick: UtilsService.digestWrapper(ctrl.onEventClick),
        viewRender: setDate
      });

      ctrl.fullCalendar.refetchEvents = refetchEvents;
      ctrl.fullCalendar.getCalendarElement = getCalendarElement;
      ctrl.fullCalendar.goToDate = goToDate;
      ctrl.fullCalendar.onEditDateToggle = onEditDateToggle;

      function setDate(view) {
        ctrl.title = view.title;
      }

      function getCalendarElement() {
        return $(element).find('.bg-calendar');
      }

      function refetchEvents() {
        return getCalendarElement().fullCalendar('refetchEvents');
      }

      function goToDate() {
        var el =  getCalendarElement();
        if (ctrl.date) {
          el.fullCalendar( 'gotoDate', ctrl.date );
          ctrl.title = el.fullCalendar('getDate').format('MMMM YYYY');
          ctrl.editDateToggle = !ctrl.editDateToggle;
          ctrl.date = "";
        }
      }

      function onEditDateToggle() {
        ctrl.editDateToggle = !ctrl.editDateToggle;
      }
    }
  }
});