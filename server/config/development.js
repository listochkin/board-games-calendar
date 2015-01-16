module.exports = {
  port: 3000,
  ip: '127.0.0.1',
  sessionSecret: 'dev',
  mongo: {
    uri: 'mongodb://localhost/board-games-calendar'
  },

  auth: {
    facebook: {
      accessTokenUrl: 'https://graph.facebook.com/oauth/access_token',
      clientId: '',
      graphApiUrl: 'https://graph.facebook.com/me'
    },
    google: {
      secret: ''
    }
  }
};
