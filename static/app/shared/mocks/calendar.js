define(function(require) {
  'use strict';

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  var events = [
    {title: 'All Day Event',start: new Date(y, m, 1)},
    {title: 'All Day Event',start: new Date(y, m, 1)},
    {title: 'All Day Event',start: new Date(y, m, 1)},
    {title: 'All Day Event',start: new Date(y, m, 1)},
    {title: 'All Day Event',start: new Date(y, m, 1)},
    {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false}
  ];

  return Mock;

  function Mock($httpBackend, regexpUrl) {
    $httpBackend.when('GET', regexpUrl('\/calendar')).respond(events);
  }

});