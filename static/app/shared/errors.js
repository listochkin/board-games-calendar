define(function(require) {
  'use strict';
  
  handleRoutingErrors.$inject = ['$rootScope', '$log'];
  return handleRoutingErrors;

  function handleRoutingErrors($rootScope, $log) {
    /**
     * Route cancellation:
     * On routing error, go to the dashboard.
     * Provide an exit clause if it tries to do it twice.
     */
    $rootScope.$on('$routeChangeError',
      function(event, current, previous, rejection) {
        var destination = (
          current &&
          (current.title || current.name || current.loadedTemplateUrl)
        ) || 'unknown target';
        var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
        /**
         * Optionally log using a custom service or $log.
         * (Don't forget to inject custom service)
         */
        $log.warning(msg, [current]);
      }
    );
  }
});