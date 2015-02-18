define(function(require) {
  'use strict';

  var angular = require('angular'),
      template = require('text!../templates/bgg-search.tpl.html'),
      controller = require('../controllers/bgg-search.controller');

  BggSearchDirective.$inject = [];
  return BggSearchDirective;

  function BggSearchDirective() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'dgBggSearch',
      bindToController: true,
      scope: {},
      controller: controller
    };
  }
});