define(function(require) {
  RoutingConfig.$inject = ['$locationProvider'];
  return RoutingConfig;

  function RoutingConfig($locationProvider, $provide) {
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(false);
  }
});