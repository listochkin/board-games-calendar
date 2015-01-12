define(function(require) {
  'use strict';

  CalendarService.$inject = ['$http', '$q'];
  return CalendarService;

  function CalendarService($http, $q) {
    return {
      getCalendarData: getCalendarData
    };

    function getCalendarData(start, end) {
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: '/api/plays/calendar',
        params: {
          startDate: start.format('DD-MM-YYYY'),
          endDate: end.format('DD-MM-YYYY')
        }
      }).
      success(function(data, status, headers, config) {
        defer.resolve(data);
      }).
      error(function(data, status, headers, config) {
        defer.reject(data, status);
        //TODO: call default error handler
      });

      return defer.promise;
    }
  }
});