define(function(require) {
  'use strict';
  
  var angular = require('angular'),
      
      playNewTemplate = require('text!./play-new.tpl.html'),
      controller = require('./play-new.controller'),

      module = angular.module('PlayNewModule', []);

  initializer.$inject = ['$rootScope', '$modal'];
  module.run(initializer);

  return module;

  function initializer($rootScope, $modal) {
    $rootScope.$on('dg:play:new', openNewModal);

    function openNewModal(options, startDate) {
      $modal.open({
        template: playNewTemplate,
        size: 'lg',
        controller: controller,
        controllerAs: 'playNewIns',
        resolve: {
          startDate: function() {
            return startDate;
          }
        }
      });
    }
  }
});