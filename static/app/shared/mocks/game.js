define(function(require) {
  'use strict';

  var angular = require('angular');

  var GameObjs = [{
    id: 1,
    nameOrigin: 'Arkham Horror',
    nameTranslated: 'Ужас Аркхема',
    ratio: '4.7',
    players: {
      min: 1,
      max: 8
    },
    avgTimePlay: 200,
    description: '"Ужас Аркхэма" - командная игра. До восьми человек могут пыщ пыщ'
  },
  {
    id: 2,
    nameOrigin: 'Arkham Horror2',
    nameTranslated: 'Ужас Аркхема2',
    ratio: '4.7',
    players: {
      min: 1,
      max: 8
    },
    avgTimePlay: 200,
    description: '"Ужас Аркхэма" - командная игра. До восьми человек могут пыщ пыщ'
  },
  {
    id: 3,
    nameOrigin: 'Arkham Horror3',
    nameTranslated: 'Ужас Аркхема3',
    ratio: '4.7',
    players: {
      min: 1,
      max: 8
    },
    avgTimePlay: 200,
    description: '"Ужас Аркхэма" - командная игра. До восьми человек могут пыщ пыщ'
  }];

  return Mock;

  function Mock($httpBackend, regexpUrl) {

    $httpBackend.when('GET', regexpUrl('\/api\/games\/[a-zA-Z0-9]+'))
    .respond(function(method, url, data) {
      return [200, GameObjs[0], {}];
    });

    $httpBackend.when('GET', regexpUrl('\/api\/games'))
    .respond(function(method, url, data) {
      return [200, GameObjs, {}];
    });


  }

});