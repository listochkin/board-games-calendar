define(function (require) {
  'use strict';
  var angular = require('angular'),
      _ = require('lodash');
  BoardGameResource.$inject = ['BggResource'];
  return BoardGameResource;

  function BoardGameResource(BGGResource) {
    /*jshint newcap: false*/
    var boardGameResourceIns = BGGResource('boardgame');

    boardGameResourceIns.prototype.getThumb = function () {
      return this.thumbnail ? this.thumbnail : 'http://placehold.it/100';
    };

    boardGameResourceIns.prototype.getImg = function () {
      return this.image ? this.image : 'http://placehold.it/290x200';
    };

    boardGameResourceIns.prototype.getName = function () {

      if (angular.isArray(this.name)) {
        return _.pluck(this.name, '__text').join(', ');
      } else {
        return this.name.__text;
      }
    };

    boardGameResourceIns.prototype.getCategories = function () {
      if (angular.isArray(this.boardgamecategory)) {
        return _.map(this.boardgamecategory, function (category) {
          return {
            id: category._objectid,
            name: category.__text
          };
        });
      } else {
        return [
          {
            id: this.boardgamecategory._objectid,
            name: this.boardgamecategory.__text
          }
        ];
      }
    };

    boardGameResourceIns.prototype.getDescription = function () {
      return this.description.replace(/(<([^>]+)>)/ig, "");
    };

    return boardGameResourceIns;
  }
});