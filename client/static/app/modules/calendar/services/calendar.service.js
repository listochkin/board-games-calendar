define(function(require) {
  'use strict';

  var moment = require('moment'),
      _ = require('lodash');

  CalendarService.$inject = ['$http', '$q'];
  return CalendarService;

  function CalendarService($http, $q) {
    return {
      getCalendarData: getCalendarData
    };

    function getCalendarData(start, end, city) {
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: '/api/plays/calendar',
        params: {
          startDate: start.format('DD-MM-YYYY'),
          endDate: end.format('DD-MM-YYYY'),
          city: city
        }
      }).
      success(function(data, status, headers, config) {
        data = transformPlayToCalendar(data);
        defer.resolve(data);
      });

      return defer.promise;
    }

    function transformPlayToCalendar(data) {
      return _.map(data, function(evt) {
        return {
          id: evt._id,
          title: evt.game ? evt.game.nameOrigin : evt.name,
          start: moment(evt.when, "YYYY-MM-DD").toDate()
        };
      });
    }
  }
});