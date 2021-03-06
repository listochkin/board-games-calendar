requirejs.config({
  baseUrl: 'app',
  urlArgs: 'bust=' + Date.now(),
  paths: {
    // Angular
    'angular': '../bower_components/angular/angular',
    'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
    'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
    'angular-messages': '../bower_components/angular-messages/angular-messages',
    'angular-animate': '../bower_components/angular-animate/angular-animate',
    'angular-route': '../bower_components/angular-route/angular-route',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-datepicker': '../bower_components/angular-datepicker/dist/index',
    'angular-toaster': '../bower_components/angularjs-toaster/toaster',
    'angular-satellizer': '../bower_components/satellizer/satellizer',
    'angular-ui-select': '../bower_components/angular-ui-select/dist/select',
    'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
    'angular-localstorage': '../bower_components/angular-local-storage/dist/angular-local-storage',
    'ng-autocomplete': '../bower_components/ngAutocomplete/src/ngAutocomplete',
    'xml2json': '../bower_components/x2js/xml2json',

    //Other
    //TODO: add css
    'fullcalendar': '../bower_components/fullcalendar/dist/fullcalendar',
    'jquery': '../bower_components/jquery/dist/jquery',
    'moment': '../bower_components/moment/moment',
    'text': '../bower_components/requirejs-text/text',
    //TODO: add css
    'twitter-bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
    'ladda-bootstrap': '../bower_components/ladda-bootstrap/dist/ladda',
    'spin': '../bower_components/spin.js/spin',
    'lodash': '../bower_components/lodash/dist/lodash'
  },

  config: {
    'app-bootstrap': {
      serverMocks: false
    }
  },

  shim: {
    //Angular
    'angular': {
      exports: 'angular',
      deps: ['jquery']
    },
    'angular-mocks': ['angular'],
    'angular-route': ['angular'],
    'angular-resource': ['angular'],
    'angular-bootstrap': ['angular', 'twitter-bootstrap'],

    //Other
    'fullcalendar': ['jquery', 'moment'],
    'twitter-bootstrap': ['jquery'],
    'ladda-bootstrap': ['twitter-bootstrap', 'spin'],

    'app-bootstrap': ['text', 'angular-mocks']
  },

  packages: [
    //directives
    'shared/directives/button-loader',
    'shared/directives/global-loader',
    'shared/directives/loading-locker',
    'shared/directives/read-more',

    //Modules
    'modules/calendar',
    'modules/main-menu',
    'modules/play',
    'modules/user',
    'modules/games',
    'modules/city-picker',
    'modules/bgg'
  ],

  deps: ['app-bootstrap']
});