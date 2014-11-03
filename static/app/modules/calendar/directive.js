define(function(require) {
    'use strict';

  var angular = require('angular'),
      template = require('text!./calendar.tpl.html'),
      controller = require('./controller'),
      $ = require('jquery');

  require('fullcalendar');

  return function () {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'dgCalendarIns',
      scope: {
      },
      controller: controller,
      link: link
    };

    function link(scope, element, attr, ctrl) {
      $(element).fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        },
        //TODO: add now
        defaultDate: '2014-09-12',
        editable: true,
        eventLimit: true,
        //TODO: load
        events: [],
        dayClick: ctrl.onDayClick,
        eventClick: ctrl.onEventClick
      });
    }
  };
});