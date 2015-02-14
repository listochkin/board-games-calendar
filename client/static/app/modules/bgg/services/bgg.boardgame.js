define(function (require) {
  'use strict';

  BoardGameResource.$inject = ['BggResource'];
  return BoardGameResource;

  function BoardGameResource(BGGResource) {
    /*jshint newcap: false*/
    var boardGameResourceIns = BGGResource('boardgame');
    //boardGameResourceIns.prototype.test = function () {
    //  return this;
    //};
    return boardGameResourceIns;
  }
});