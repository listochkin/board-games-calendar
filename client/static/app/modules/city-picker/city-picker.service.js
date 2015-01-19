define(function(require) {
  'use strict';

  CityPickerService.$inject = ['$http', '$q'];
  return CityPickerService;

  function CityPickerService($http, $q) {
    return {
      getCities: getCities
    };

    function getCities() {
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: '/api/cities'
      }).
      success(function(data, status, headers, config) {
        defer.resolve(data);
      });

      return defer.promise;
    }

  }
});