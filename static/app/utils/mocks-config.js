define(function(require) {
  'use strict';

  var calendarMocks = require('./mocks/calendar'),
      playMocks = require('./mocks/play');

  mocksConfig.$inject = ['$httpBackend', '$timeout'];
  return mocksConfig;

  function regexpUrl(regexp) {
    return {
      test: function(url) {
        this.matches = url.match(regexp);
        return this.matches && this.matches.length > 0;
      }
    };
  }

  function mocksConfig($httpBackend, $timeout) {
    calendarMocks($httpBackend, regexpUrl);
    playMocks($httpBackend, regexpUrl);

    var flushBackend = function() {
      try {
        $httpBackend.flush();
      } catch (err) {
        // ignore that there's nothing to flush
      }
      $timeout(flushBackend, 500);
    };
    $timeout(flushBackend, 500);
  }

});