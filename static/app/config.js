requirejs.config({
  baseUrl: 'static/',
  urlArgs: 'bust=' +  Date.now(),
  paths: {
    
  },

  config: {
    'app-bootstrap': {
      serverMocks: true
    }
  },

  shim: {
    
  },

  packages: [
  ],

  deps: ['app-bootstrap']
});