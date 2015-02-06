define(function(require) {
  'use strict';

  var _ = require('lodash');
  WishlistService.$inject = ['$resource'];
  return WishlistService;

  function WishlistService($resource) {
    var Wishlist = $resource('api/wishlist/:_id', {_id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });

    return {
      getWishlistByUserId: getWishlistByUserId,
      createWishlist: createWishlist,
      updateWishlist: updateWishlist
    };

    function getWishlistByUserId(options) {
      var wishlist = Wishlist.get({ userId: options.userId });
      return wishlist.$promise;
    }

    function createWishlist(wishlistDataParam) {
      var wishlistData = _mapId(wishlistDataParam);
      var wishlist = new Wishlist(wishlistData);
      return wishlist.$save();
    }

    function updateWishlist(wishlistParam) {
      var wishlist = _mapId(wishlistParam);
      return Wishlist.update({_id: wishlist._id}, wishlist);
    }

    function _mapId(wishlistParam) {
      var wishlist = _.cloneDeep(wishlistParam);
      if(wishlist.gameSubscriptions) {
        wishlist.gameSubscriptions = wishlist.gameSubscriptions.map(function (item) { return item._id; });
      }
      if(wishlist.citySubscriptions) {
        wishlist.citySubscriptions = wishlist.citySubscriptions.map(function (item) { return item._id; });
      }
      return wishlist;
    }

  }
});
