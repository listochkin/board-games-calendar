define(function(require) {
  'use strict';

  CityPickerService.$inject = ['$http'];
  return CityPickerService;

  function CityPickerService($http) {
    return {
      getCities: getCities
    };

    function getCities() {
      return $http({
        method: 'GET',
        url: '/api/cities'
      });
    }

  }
});
