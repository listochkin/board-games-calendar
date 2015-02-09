define(function (require) {
    'use strict';

    var angular = require('angular'),

        PlaysListTemplate = require('text!./templates/plays-list.tpl.html'),
        PlayJoinTemplate = require('text!./templates/play-join.tpl.html'),
        PlayJoinController = require('./controllers/play-join.controller'),
        PlayJoinMenuDirective = require('./directives/play-join-menu.directive'),

        PlayNewEditTemplate = require('text!./templates/play-new-edit.tpl.html'),
        PlayNewController = require('./controllers/play-new.controller'),
        PlayEditController = require('./controllers/play-edit.controller'),
        PlaysListController = require('./controllers/plays-list.controller'),

        PlayService = require('./services/play.service'),

        module = angular.module('PlayModule', ['UtilsModule']);

    module.directive('dgPlayJoinMenu', PlayJoinMenuDirective);
    module.factory('dgPlayService', PlayService);

    initializer.$inject = ['$rootScope', '$modal', '$location'];
    playModuleConfig.$inject = ['$routeProvider'];

    module
        .config(playModuleConfig)
        .run(initializer);

    return module;

    function playModuleConfig($routeProvider) {
      $routeProvider
        .when('/plays', {
          template: PlaysListTemplate,
          controllerAs: 'dgPListIns',
          controller: PlaysListController,
          resolve: {
              plays: PlaysListController.resolver.getPlaysData,
              playsCount: PlaysListController.resolver.getPlaysCount
          }
        })
        .when('/plays/page/:pageId', {
          template: PlaysListTemplate,
          controllerAs: 'dgPListIns',
          controller: PlaysListController,
          resolve: {
            plays: PlaysListController.resolver.getPlaysData,
            playsCount: PlaysListController.resolver.getPlaysCount
          }
        });
    }


    function initializer($rootScope, $modal, $location) {
      $rootScope.$on('dg:play:join', openJoinModal);
      $rootScope.$on('dg:play:edit', openEditModal);
      $rootScope.$on('dg:play:new', openNewModal);
      $rootScope.$on('$locationChangeStart', onLocationChangeCheckPlay);

      function onLocationChangeCheckPlay() {
        if ($location.search().playId) {
          openJoinModal({}, $location.search().playId);
        }
      }

        function openNewModal(options, startDate) {
          $modal.open({
            template: PlayNewEditTemplate,
            size: 'lg',
            controller: PlayNewController,
            controllerAs: 'playIns',
            resolve: {
                startDate: function () {
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
                playId: function () {
                    return playId;
                }
            }
          });
        }

        function openEditModal(options, playId) {
          $rootScope.$emit('dg:globalLoader:show');
          $modal.open({
            template: PlayNewEditTemplate,
            size: 'lg',
            controller: PlayEditController,
            controllerAs: 'playIns',
            resolve: {
              playId: function () {
                return playId;
              }
            }
          });
        }
    }
});