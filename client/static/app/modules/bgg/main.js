define(function (require) {
  'use strict';

  var angular = require('angular'),
    BGGSearchDirective = require('./directives/bgg-search.directive'),
    BGGBoardgameDetails = require('./directives/bgg-boardgame-details.directive'),
    BGGService = require('./services/bgg.service'),
    BGGResource = require('./services/bgg.resource'),
    BoardGameResource = require('./services/bgg.boardgame'),
    module = angular.module('BGGModule', []);

  module.directive('dgBggSearch', BGGSearchDirective);
  module.factory('dgBGGService', BGGService);

  module.factory('BGGResource', BGGResource);
  module.factory('BGGResourceBoardgame', BoardGameResource);
  module.directive('dgBggBoardgameDetails', BGGBoardgameDetails);

  module.constant('BGG_CONFIG', {
    proxyUrl: '/api/games/bgg',
    baseUrl: 'http://www.boardgamegeek.com',
    version: 'xmlapi'
  });
  return module;

});