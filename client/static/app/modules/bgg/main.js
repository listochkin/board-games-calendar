define(function (require) {
    'use strict';

    var angular = require('angular'),
        BGGSearchDirective = require('./directives/play-join-menu.directive'),
        BGGService = require('./services/bgg.service'),

        module = angular.module('BGGModule', []);

    module.directive('dgBggSearch', BGGSearchDirective);
    module.factory('dgBGGService', BGGService);

    return module;

});