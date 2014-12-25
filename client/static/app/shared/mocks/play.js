define(function(require) {
  'use strict';

  var angular = require('angular');

  var PlayObj = {
    img: 'http://placehold.it/290x160',
    name: 'Arkham Horror',
    playersMin: 2,
    playersMax: 4,
    where: 'Lidersovskiy 9a',
    when: '17/10/2014 18:00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem eos.',
    game: {
      published: 2005,
      playersMin: 1,
      playersMax: 8,
      playTime: '240 minutes',
      description: 'The year is 1926, and it is the height of the Roaring Twenties...'
    },
    players: [
      {
        id: 1,
        name: 'Artem',
        type: 'org',
        phone: '+380506114789'
      },
      {
        id: 2,
        name: 'Vasiliy',
        type: 'player',
        phone: '+380506114789'
      },
      {
        id: 3,
        name: 'Petro',
        type: 'player',
        phone: ''
      },
      {
        name: 'Available',
        type: 'empty',
        phone: ''
      }
    ]
  };

  return Mock;

  function Mock($httpBackend, regexpUrl) {
    
    //TODO: fix regexp
    $httpBackend.when('POST', regexpUrl('\/api\/play\/[0-9]+\/[0-9]+/join'))
    .respond(function(method, url, data) {
      console.log('POST JOIN');
      return [200, PlayObj, {}];
    });

    $httpBackend.when('GET', regexpUrl('\/api\/play\/'))
    .respond(function(method, url, data) {
      console.log('GET GAME');
      return [200, PlayObj, {}];
    });

    $httpBackend.when('POST', regexpUrl('\/api\/play'))
    .respond(function(method, url, data) {
      console.log('POST GAME');
      var play = angular.fromJson(data);
      play.id = 1;
      return [200, play, {}];
    });
  }

});