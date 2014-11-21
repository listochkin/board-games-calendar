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
    }
  };

  return Mock;

  function Mock($httpBackend, regexpUrl) {
    $httpBackend.when('POST', regexpUrl('\/api\/play'))
    .respond(function(method, url, data) {
      var play = angular.fromJson(data);
      play.id = 1;
      return [200, play, {}];
    });

    $httpBackend.when('GET', regexpUrl('\/api\/play\/'))
    .respond(function(method, url, data) {
      console.log('GET');
      return [200, PlayObj, {}];
    });
  }

});