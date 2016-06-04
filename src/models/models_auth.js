import mongoose from 'mongoose';
import bcrypt from '../../lib/bcrypt-thunk';
import co from 'co';

let Schema = mongoose.Schema;
let model = module.exports;

let AccessTokensSchema = new Schema({
  accessToken: {type: String},
  clientId: {type: String},
  userId: {type: String},
  expires: {type: Date}
});

let RefreshTokensSchema = new Schema({
  refreshToken: {type: String},
  clientId: {type: String},
  userId: {type: String},
  expires: {type: Date}
});

let ClientsSchema = new Schema({
  clientId: {type: String},
  clientSecret: {type: String},
  redirectUri: {type: String}
});

let UsersSchema = new Schema({
  username: {type: String},
  password: {type: String},
  firstname: {type: String},
  lastname: {type: String},
  email: {type: String, default: ''}
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
    }
  }
});


UsersSchema.pre('save', function(done) {
  if (!this.isModified('password')) {
    return done();
  }

  co.wrap(function *() {
    try {
      let salt = yield bcrypt.genSalt();
      let hash = yield bcrypt.hash(this.password, salt);
      this.password = hash;
      done();
    }
    catch (err) {
      done(err);
    }
  }).call(this).then(done);
});


UsersSchema.methods.comparePassword = function *(candidatePassword) {
  return yield bcrypt.compare(candidatePassword, this.password);
};

UsersSchema.statics.passwordMatches = function *(username, password) {
  let user = yield this.findOne({username: username.toLowerCase()}).exec();
  if (!user) {
    throw new Error('User not found');
  }

  if (yield user.comparePassword(password)) {
    return user;
  }

  throw new Error('Password does not match');
};

let AccessTokensModel = mongoose.model('AccessTokens', AccessTokensSchema);
let RefreshTokensModel = mongoose.model('RefreshTokens', RefreshTokensSchema);
let ClientsModel = mongoose.model('Clients', ClientsSchema);
let UsersModel = mongoose.model('Users', UsersSchema);

model.getAccessToken = function(bearerToken, callback) {
  AccessTokensModel.findOne({accessToken: bearerToken}, callback);
};

model.getClient = function(clientId, clientSecret, callback) {
  if (clientSecret === null) {
    return ClientsModel.findOne({clientId: clientId}, callback);
  }
  ClientsModel.findOne({clientId: clientId, clientSecret: clientSecret}, callback);
};

let authorizedClientIds = ['s6BhdRkqt3', 'toto'];
model.grantTypeAllowed = function(clientId, grantType, callback) {
  if (grantType === 'password') {
    return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
  }

  callback(false, true);
};

model.saveAccessToken = function(token, clientId, expires, userId, callback) {
  let accessToken = new AccessTokensModel({
    accessToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  accessToken.save(callback);
};

model.getUser = function(username, password, callback) {
  co(function *() {
    try {
      return yield UsersModel.passwordMatches(username, password);
    }
    catch (ex) {
      return null;
    }
  }).then(function(user) {
    if (!user) callback(null);
    callback(null, user._id);
  });
};

model.saveRefreshToken = function(token, clientId, expires, userId, callback) {
  let refreshToken = new RefreshTokensModel({
    refreshToken: token,
    clientId: clientId,
    userId: userId,
    expires: expires
  });

  refreshToken.save(callback);
};

model.getRefreshToken = function(refreshToken, callback) {
  RefreshTokensModel.findOne({refreshToken: refreshToken}, callback);
};
