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
      clientId: '7f216f41be5a16cec3f3d88cd0940604',
      graphApiUrl: 'https://graph.facebook.com/me'
    },
    google: {
      secret: 'mIl8CIAXOCrUdS_y6fEaxC5H'
    }
  }
};
