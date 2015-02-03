define(function(require) {
  'use strict';

  var angular = require('angular'),
    WishlistController = require('./controllers/wishlist.controller'),
    WishlistPageTemplate = require('text!./templates/wishlist-page.tpl.html'),
    WishlistTimePickerDirective = require('./directives/wishlist-time-picker.directive'),
    module = angular.module('WishlistModule', []);

  WishlistScreen.$inject = ['$routeProvider'];

  module.directive('dgWishlistTimePicker', WishlistTimePickerDirective);
  module.config(WishlistScreen);

  return module;

  function WishlistScreen($routeProvider) {
    $routeProvider
      .when('/wishlist', {
        template: WishlistPageTemplate,
        controllerAs: 'dgWishlistIns',
        controller: WishlistController,
        resolve: {
          user: WishlistController.resolver.getRequiredUser
        }
      });
  }
});