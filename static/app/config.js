requirejs.config({
  baseUrl: 'static/app',
  urlArgs: 'bust=' +  Date.now(),
  paths: {
    // Angular
    'angular': '../bower_components/angular/angular',
    'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
    'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
    'angular-route': '../bower_components/angular-route/angular-route',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-datepicker': '../bower_components/angular-datepicker/dist/index',

    //Other
    //TODO: add css
    'fullcalendar': '../bower_components/fullcalendar/dist/fullcalendar',
    'jquery': '../bower_components/jquery/dist/jquery',
    'moment': '../bower_components/moment/moment',
    'text': '../bower_components/requirejs-text/text',
    //TODO: add css
    'twitter-bootstrap': '../bower_components/bootstrap/dist/js/bootstrap'
  },

  config: {
    'app-bootstrap': {
      serverMocks: true
    }
  },

  shim: {
    //Angular
    'angular': {
      exports: 'angular'
    },
    'angular-mocks': ['angular'],
    'angular-route': ['angular'],
    'angular-resource': ['angular'],
    'angular-bootstrap': ['angular', 'twitter-bootstrap'],

    //Other
    'fullcalendar': ['jquery', 'moment'],
    'twitter-bootstrap': ['jquery'],

    'app-bootstrap': ['text', 'angular-mocks']
  },

  packages: [
    //Screens
    'screens/calendar',

    //Modules
    'modules/calendar',
    'modules/main-menu',
    'modules/game'
  ],

  deps: ['app-bootstrap']
});