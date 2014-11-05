define(function(require) {
  'use strict';

  var angular = require('angular'),
      template = require('text!./calendar.tpl.html'),
      controller = require('./calendar.controller'),
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
      scope: {
        onGameClick: '&'
      },
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
    }
  }
});