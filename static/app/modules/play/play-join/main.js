define(function(require) {
  'use strict';
  
  var angular = require('angular'),

      playJoinTemplate = require('text!./templates/play-join.tpl.html'),
      controller = require('./controllers/play-join.controller'),
      playJoinMenuDirective = require('./directives/play-join-menu.directive'),

      module = angular.module('PlayJoinModule', []);

  module.directive('dgPlayJoinMenu', playJoinMenuDirective);
  
  initializer.$inject = ['$rootScope', '$modal', '$q', '$timeout'];
  module.run(initializer);

  return module;

  function initializer($rootScope, $modal, $q, $timeout) {
    $rootScope.$on('dg:play:join', openJoinModal);

    function openJoinModal(options, playId) {
      $rootScope.$emit('dg:globalLoader:show');
      $modal.open({
        template: playJoinTemplate,
        size: 'lg',
        controller: controller,
        controllerAs: 'joinIns',
        resolve: {
          playId: function() {
            var defer = $q.defer();
            //TODO: tmp get user
            $timeout(function() {
              $rootScope.$emit('dg:globalLoader:hide');
              defer.resolve(playId);
            }, 3000);
            return defer.promise;
          }
        }
      });
    }
  }
});