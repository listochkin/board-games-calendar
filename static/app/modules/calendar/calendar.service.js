define(function(require) {
  'use strict';

  Service.$inject = ['$http', '$q'];
  return Service;

  function Service($http, $q) {
    return {
      getCalendarData: getCalendarData
    };

    function getCalendarData(start, end) {
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: '/calendar',
        params: {
          start: start.format('DD-MM-YYYY'),
          end: end.format('DD-MM-YYYY')
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