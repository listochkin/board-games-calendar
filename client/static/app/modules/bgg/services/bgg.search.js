define(function (require) {
  'use strict';
  var angular = require('angular');
  BoardGameResource.$inject = ['BggResource'];
  return BoardGameResource;

  function BoardGameResource(BggResource) {
    /*jshint newcap: false*/
    var boardGameResourceIns = BggResource('search');

    boardGameResourceIns.prototype.getName = function () {
      return this.name.toString();
    };
    return boardGameResourceIns;
  }
});