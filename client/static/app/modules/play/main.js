define(function(require) {
  'use strict';
  
  var angular = require('angular'),

      playJoinTemplate = require('text!./templates/play-join.tpl.html'),
      playJoinController = require('./controllers/play-join.controller'),
      playJoinMenuDirective = require('./directives/play-join-menu.directive'),

      playNewTemplate = require('text!./templates/play-new.tpl.html'),
      playNewController = require('./controllers/play-new.controller'),

      module = angular.module('PlayModule', []);

  module.directive('dgPlayJoinMenu', playJoinMenuDirective);
  
  initializer.$inject = ['$rootScope', '$modal', '$q', '$timeout'];
  module.run(initializer);

  return module;

  function initializer($rootScope, $modal, $q, $timeout) {
    $rootScope.$on('dg:play:join', openJoinModal);
    $rootScope.$on('dg:play:new', openNewModal);

    function openNewModal(options, startDate) {
      $modal.open({
        template: playNewTemplate,
        size: 'lg',
        controller: playNewController,
        controllerAs: 'playNewIns',
        resolve: {
          startDate: function() {
            return startDate;
          }
        }
      });
    }

    function openJoinModal(options, playId) {
      $rootScope.$emit('dg:globalLoader:show');
      $modal.open({
        template: playJoinTemplate,
        size: 'lg',
        controller: playJoinController,
        controllerAs: 'joinIns',
        resolve: {
          playId: function() {
            var defer = $q.defer();
            //TODO: tmp get user
            $timeout(function() {
              $rootScope.$emit('dg:globalLoader:hide');
              defer.resolve(playId);
            }, 1000);
            return defer.promise;
          }
        }
      });
    }
  }
});