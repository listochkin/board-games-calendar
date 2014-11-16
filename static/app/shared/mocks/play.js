define(function(require) {
  'use strict';

  var angular = require('angular');

  var PlayObj = {
    ololo: 1
  };

  return Mock;

  function Mock($httpBackend, regexpUrl) {
    $httpBackend.when('POST', regexpUrl('\/api\/play'))
    .respond(function(method, url, data) {
      var play = angular.fromJson(data);
      play.id = 1;
      return [200, play, {}];
    });
  }

});