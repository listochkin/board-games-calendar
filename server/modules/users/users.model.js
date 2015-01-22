/*jslint node: true */
'use strict';

var crypto = require('crypto'),
    generatePassword = require('password-generator'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: {type: String, lowercase: true},
  avatar: String,
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  emailConfirmToken: {
    type: String,
    default: ''
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false
  },
  salt: String,
  facebook: {},
  google: {}
});

UserSchema.statics.findByEmailOrSocials = findByEmailOrSocials;

/**
* Static methods
*/
function findByEmailOrSocials(email, provider, providerId) {
  /*jshint validthis:true */
  var query = this.findOne(),
      orQ = [{email: email}];
  if (provider) {
    var social = {};
    social[provider+'.id'] = providerId;
    orQ.push(social);
  }
  return query.or(orQ).exec();
}

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) {
      return next();
    }
    var key = this.id;
    if (!this.password) {
      this.password = generatePassword();
    }
    if (this.email && !this.username) {
      this.username = this.email.match(/^([^@]*)@/)[1]; // getting name from email
    }
    this.emailConfirmToken = crypto.createHmac('sha1', key).digest('hex');
    next();
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var currentUserId = this.id;
    this.constructor.findOne({email: value}, function(err, user) {
      if (err) {
        throw err;
      }
      if (user) {
        if (currentUserId === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      respond(true);
    });
  }, 'The specified email address is already in use.');

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText, done) {
    done(this.encryptPassword(plainText), this.hashedPassword);
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) {
      return '';
    }
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('Users', UserSchema);
