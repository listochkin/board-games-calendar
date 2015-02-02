define(function(require) {
  'use strict';

  WishlistController.$inject = ['$rootScope'];
  return WishlistController;

  function WishlistController($rootScope) {
    var vm = this;

    vm.getWishlist = getWishlist;

    function getWishlist() {
      console.log('#getWishlist');
    }
  }
});
