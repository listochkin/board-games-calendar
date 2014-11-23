define(function(require) {
  'use strict';

  LoadingLockerDirective.$inject = [];
  return LoadingLockerDirective;

  function LoadingLockerDirective() {
    return {
      restrict: 'A',
      scope: {
        isLoading: '='
      },
      link: link
    };

    function link(scope, element) {
      scope.$watch('isLoading', changeLock);

      function changeLock(state) {
        if (state) {
          element.find('input').attr('disabled', 'yes');
          element.find('textarea').attr('disabled', 'yes');
        } else {
          element.find('input').removeAttr('disabled');
          element.find('textarea').removeAttr('disabled');
        }
      }
    }
  }
});