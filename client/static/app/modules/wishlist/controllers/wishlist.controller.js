define(function() {
  'use strict';

  WishlistController.$inject = ['$rootScope', 'resolverData', 'dgWishlistService'];

  WishlistController.resolver = {
    getResolverData: getResolverData
  };

  return WishlistController;

  function WishlistController($rootScope, resolverData, dgWishlistService) {
    var vm = this;

    vm.user = resolverData.user;
    vm.wishlist = resolverData.wishlist;

    vm.onGameSelectChange = onGameSelectChange;
    vm.onCitySelectChange = onCitySelectChange;
    vm.onTimePeriodSelectChange = onTimePeriodSelectChange;
    vm.doSave = doSave;

    function onGameSelectChange(item, model, selected) {
      doSave({ gameSubscriptions: selected });
    }

    function onCitySelectChange(item, model, selected) {
      doSave({ citySubscriptions: selected });
    }

    function onTimePeriodSelectChange(item) {
      doSave({ notificationPeriod: item });
    }

    function doSave(wishlistData) {
      var wishlist = vm.wishlist || wishlistData;

      if(vm.wishlist) {
        if(wishlistData.gameSubscriptions) wishlist.gameSubscriptions = wishlistData.gameSubscriptions;
        if(wishlistData.citySubscriptions) wishlist.citySubscriptions = wishlistData.citySubscriptions;
        if(wishlistData.notificationPeriod) wishlist.notificationPeriod = wishlistData.notificationPeriod;
        dgWishlistService.updateWishlist(wishlist);
      }
      else if(wishlistData) {
        wishlist.userId = vm.user._id;

        dgWishlistService.createWishlist(wishlist)
        .then(function(data) {
          $rootScope.$emit('dg:globalLoader:show');
          vm.wishlist = data;
        })
        .finally(function() {
          $rootScope.$emit('dg:globalLoader:hide');
        });
      }
    }
  }
});

function getResolverData($q, dgUserService, dgWishlistService) {
  var defer = $q.defer(),
      res = {};

  dgUserService.requestRequiredUser()
  .then(function(user) {
    res.user = user.data;
    return dgWishlistService.getWishlistByUserId({ userId: user.data._id });
  })
  .then(function(wishlist) {
    res.wishlist = wishlist.data;
    defer.resolve(res);
  });

  return defer.promise;
}
