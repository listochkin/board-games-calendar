define(function(require) {
  'use strict';

  var angular = require('angular'),
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
        template: WishlistPageTemplate
      });
  }
});