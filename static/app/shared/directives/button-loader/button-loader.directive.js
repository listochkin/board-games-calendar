define(function(require) {
  'use strict';

  var Ladda = require('ladda-bootstrap');

  ButtonLoaderDirective.$inject = [];
  return ButtonLoaderDirective;

  function ButtonLoaderDirective() {
    return {
      restrict: 'A',
      scope: {
        isLoading: '='
      },
      link: link
    };

    function link(scope, element) {
      scope.$watch('isLoading', changeLoading);

      function changeLoading(state) {
        var loader = Ladda.create(element[0]);
        if (state) {
          loader.start();
        } else {
          loader.stop();
        }
      }
    }
  }
});