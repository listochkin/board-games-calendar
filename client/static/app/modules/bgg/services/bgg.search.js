define(function (require) {
  'use strict';

  BoardGameResource.$inject = ['BggResource'];
  return BoardGameResource;

  function BoardGameResource(BggResource) {
    /*jshint newcap: false*/
    var boardGameResourceIns = BggResource('search');
    //boardGameResourceIns.prototype.test = function () {
    //  return this;
    //};
    return boardGameResourceIns;
  }
});