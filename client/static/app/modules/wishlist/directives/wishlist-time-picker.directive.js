define(function(require) {
  'use strict';

  var template = require('text!../templates/wishlist-time-picker.tpl.html'),
    controller = require('../controllers/wishlist-time-picker.controller');

  return WishlistTimePickerModule;

  function WishlistTimePickerModule() {
    return {
      replace: true,
      restrict: 'E',
      template: template,
      controller: controller,
      controllerAs: 'dgWishlistTimePickerIns',
      scope: false
    };
  }
});
