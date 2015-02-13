define(function (require) {
  'use strict';

  var angular = require('angular'),
      BGGSearchDirective = require('./directives/bgg-search.directive'),
      BGGBoardgameDetails = require('./directives/bgg-boardgame-details.directive'),
      BGGResource = require('./services/bgg.resource'),
      BoardGameResource = require('./services/bgg.boardgame'),
      BoardGameSearch = require('./services/bgg.search'),
      module = angular.module('BGGModule', []);

  module.factory('BggResource', BGGResource);
  module.factory('BggResourceBoardgame', BoardGameResource);
  module.factory('BggResourceSearch', BoardGameSearch);

  module.directive('dgBggBoardgameDetails', BGGBoardgameDetails);
  module.directive('dgBggSearch', BGGSearchDirective);


  module.constant('BGG_CONFIG', {
    proxyUrl: '/api/games/bgg',
    baseUrl: 'http://www.boardgamegeek.com',
    version: 'xmlapi'
  });
  return module;

});