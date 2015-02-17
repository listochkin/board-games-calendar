define(function (require) {
  'use strict';

  var angular = require('angular'),
    _ = require('lodash');

  var PlayObj = {
      __v: 1,
      _id: '54e2fecf9de436ac0d48284c',
      address: 'Lidersovskiy 9a',
      creator: "54e257937039dbb8088eef39",
      img: 'http://placehold.it/290x160',
      name: 'Arkham Horror',
      playersMin: 2,
      playersMax: 4,
      city: {
        formatted_address: "Донецк, Донецкая область, Украина",
        id: "b1e5f9ff379a335886960c471fddb179d0036e30"
      },
      when: "2015-02-19T00:00:00.000Z",
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem eos.',
      game: {
        published: 2005,
        playersMin: 1,
        playersMax: 8,
        playTime: '240 minutes',
        description: 'The year is 1926, and it is the height of the Roaring Twenties...'
      },
      players: ["54e257937039dbb8088eef39"]
    },
    statuses = ['ended', 'not-started', 'canceled', 'not-started', 'not-started'],
    plays = [],
    date = (new Date()).getDate() - 1,
    month = (new Date()).getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }

  for (var i = 0, j = 5; i < j; i++) {
    var play = _.cloneDeep(PlayObj);
    play.when = "2015-" + month + "-" + (date+i) + "T00:00:00.000Z";
    play.status = statuses[i];
    plays.push(play);
  }

  return Mock;

  function Mock($httpBackend, regexpUrl) {
    //TODO: fix regexp
    $httpBackend.when('POST', regexpUrl('\/api\/plays\/[0-9]+\/[0-9]+/join'))
      .respond(function (method, url, data) {
        console.log('POST JOIN');
        return [200, PlayObj, {}];
      });

    $httpBackend.when('GET', regexpUrl('\/api\/plays\/'))
      .respond(function (method, url, data) {
        console.log('GET PLAY');
        return [200, PlayObj, {}];
      });

    $httpBackend.when('GET', regexpUrl('\/api\/plays'))
      .respond(function (method, url, data) {
        console.log('GET PLAYS');
        return [200, plays, {}];
      });

    $httpBackend.when('POST', regexpUrl('\/api\/plays'))
      .respond(function (method, url, data) {
        console.log('POST PLAY');
        return [200, plays, {}];
      });
  }

});