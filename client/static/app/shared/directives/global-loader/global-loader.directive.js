define(function(require) {
  'use strict';

  var globalLoaderTemplate = require('text!./global-loader.tpl.html'),
      Spinner = require('spin');

  GlobalLoaderDirective.$inject = ['$rootScope'];
  return GlobalLoaderDirective;

  function GlobalLoaderDirective($rootScope) {
    return {
      replace: true,
      restrict: 'E',
      template: globalLoaderTemplate,
      scope: false,
      link: link
    };

    function link(scope, element) {
      $rootScope.$on('dg:globalLoader:show', showLoader);
      $rootScope.$on('dg:globalLoader:hide', hideLoader);

      var opts = {
        lines: 13, // The number of lines to draw
        length: 30, // The length of each line
        width: 20, // The line thickness
        radius: 50, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#FFF', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
      };

      var spinner = new Spinner(opts).spin();

      function showLoader() {
        element.removeClass('ng-hide');
        element[0].querySelector('.global-loader__spinner').appendChild(spinner.el);
      }

      function hideLoader() {
        element.addClass('ng-hide');
        element[0].querySelector('.global-loader__spinner').innerHTML = "";
      }
    }
  }
});