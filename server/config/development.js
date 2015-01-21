module.exports = {
  port: 3000,
  ip: '127.0.0.1',
  securePort : 8433,
  tokenSecret: process.env.tokenSecret || 'A hard to guess string',
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
      secret: 'PFXb3adh-UfbgkaNJYptvFF3',
      accessTokenUrl: 'https://accounts.google.com/o/oauth2/token',
      peopleApiUrl: 'https://www.googleapis.com/plus/v1/people/me/openIdConnect'
    }
  }
};
