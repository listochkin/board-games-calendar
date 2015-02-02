define(function(require) {
  'use strict';

  WishlistService.$inject = ['$http'];
  return WishlistService;

  function WishlistService($http) {
    return {
      getWishlist: getWishlist
    };

    function getWishlist() {
      return $http({
        method: 'GET',
        url: '/api/wishlist'
      });
    }

  }
});
