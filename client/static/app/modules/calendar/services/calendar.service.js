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
        method: 'POST',
        url: '/api/plays/calendar',
        data: {
          startDate: start.format('DD-MM-YYYY'),
          endDate: end.format('DD-MM-YYYY'),
          cityId: (city) ? city.id : null
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
          title: evt.name,
          start: moment(evt.when, "YYYY-MM-DD").toDate()
        };
      });
    }
  }
});