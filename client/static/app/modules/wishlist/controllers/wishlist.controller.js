define(function(require) {
  'use strict';

  WishlistController.$inject = ['$rootScope'];

  WishlistController.resolver = {
    getRequiredUser: getRequiredUser
  };

  return WishlistController;

  function WishlistController($rootScope) {
    var vm = this;

    function getWishlist() {
      console.log('#getWishlist');
    }
  }
});

function getRequiredUser($rootScope, dgUserService) {
  return dgUserService.requestRequiredUser();
}
