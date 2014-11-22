define(function(require) {
  'use strict';
  
  var angular = require('angular'),

      playJoinTemplate = require('text!./play-join.tpl.html'),
      controller = require('./play-join.controller'),

      module = angular.module('PlayJoinModule', []);
  
  initializer.$inject = ['$rootScope', '$modal'];
  module.run(initializer);

  return module;

  function initializer($rootScope, $modal) {
    $rootScope.$on('dg:play:join', openJoinModal);

    function openJoinModal(options, playId) {
      $modal.open({
        template: playJoinTemplate,
        size: 'lg',
        controller: controller,
        controllerAs: 'joinIns',
        resolve: {
          //TODO: add resolver fetching play by id + loader
          playId: function() {
            return playId;
          }
        }
      });
    }
  }
});