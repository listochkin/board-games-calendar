define(function(require) {
  'use strict';
  
  var angular = require('angular'),

      PlayJoinTemplate = require('text!./templates/play-join.tpl.html'),
      PlayJoinController = require('./controllers/play-join.controller'),
      PlayJoinMenuDirective = require('./directives/play-join-menu.directive'),

      PlayNewTemplate = require('text!./templates/play-new.tpl.html'),
      PlayNewController = require('./controllers/play-new.controller'),

      PlayService = require('./services/play.service'),

      module = angular.module('PlayModule', []);

  module.directive('dgPlayJoinMenu', PlayJoinMenuDirective);
  module.factory('dgPlayService', PlayService);
  
  initializer.$inject = ['$rootScope', '$modal', '$location'];
  module.run(initializer);

  return module;

  function initializer($rootScope, $modal, $location) {
    $rootScope.$on('dg:play:join', openJoinModal);
    $rootScope.$on('dg:play:new', openNewModal);
    $rootScope.$on('$locationChangeStart', onLocationChangeCheckPlay);

    function onLocationChangeCheckPlay() {
      if ($location.search().playId) {
        openJoinModal({}, $location.search().playId);
      }
    }

    function openNewModal(options, startDate) {
      $modal.open({
        template: PlayNewTemplate,
        size: 'lg',
        controller: PlayNewController,
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
        template: PlayJoinTemplate,
        size: 'lg',
        controller: PlayJoinController,
        controllerAs: 'joinIns',
        resolve: {
          playId: function() {
            return playId;
          }
        }
      });
    }
  }
});