define(function(require) {
  'use strict';

  var angular = require('angular'),
      template = require('text!./user-menu.tpl.html'),
      controller = require('./user-menu.controller');

  UserMenuDirective.$inject = [];
  return UserMenuDirective;

  function UserMenuDirective() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'dgUserMenuIns',
      bindToController: true,
      scope: false,
      controller: controller,
      link: link
    };

    function link(scope, element, attr, ctrl) {
      
    }
  }
});