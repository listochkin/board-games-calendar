define(function(require) {
  'use strict';

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  var events = [
    {id: 12, title: 'All Day Event',start: new Date(y, m, 1)},
    {id: 13, title: 'All Day Event2',start: new Date(y, m, 1)},
    {id: 14, title: 'All Day Event3',start: new Date(y, m, 1)},
    {id: 15, title: 'All Day Event4',start: new Date(y, m, 1)},
    {id: 16, title: 'All Day Event5',start: new Date(y, m, 1)},
    {id: 17, title: 'All Day Event6',start: new Date(y, m, 1)},
    {id: 18, title: 'All Day Event7',start: new Date(y, m, 1)},
    {id: 19, title: 'All Day Event8',start: new Date(y, m, 1)},
    {id: 20, title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false}
  ];

  return Mock;

  function Mock($httpBackend, regexpUrl) {
    $httpBackend.when('GET', regexpUrl('\/calendar')).respond(events);
  }

});