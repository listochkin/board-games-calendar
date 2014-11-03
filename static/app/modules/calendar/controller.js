define(function(require) {
  var angular = require('angular');

  return [function () {
    this.person = 'man';

    this.onDayClick = function() {
        console.log('day clicked');
    };

    this.onEventClick = function() {
        console.log('event click');
    };
  }];
});