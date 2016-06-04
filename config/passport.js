import mongoose from 'mongoose';
let BearerStrategy = require('passport-http-bearer').Strategy;
let authenticator = require('../lib/authenticator');
let ModelUser = mongoose.model('Users');

let serialize = function(user, done) {
  done(null, user._id);
};

let deserialize = function(id, done) {
  ModelUser.findById(id, done);
};

module.exports = function(passport) {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use(new BearerStrategy(authenticator.bearerUser));
};
