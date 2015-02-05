define(function (require) {
  'use strict';
  var angular = require('angular');
  uniqueEmail.$inject = ['dgUserService', '$q'];
  return uniqueEmail;
  function uniqueEmail(dgUserService, $q) {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: link
    };

    function link(scope, el, attrs, ctrl) {
      ctrl.$asyncValidators.uniqueEmail = function (modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
        }
        var def = $q.defer();
        dgUserService.currentUserResource.email = viewValue;
        dgUserService.currentUserResource.$isUniqueEmail(function (user) {
          if (user.data) {
            def.reject();
          } else {
            def.resolve();
          }
        });
        return def.promise;
      };
    }
  }
});