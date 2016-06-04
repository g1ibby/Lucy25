import mongoose from 'mongoose';
import co from 'co';

let ModelUser = mongoose.model('Users');
let ModelAccessTokens = mongoose.model('AccessTokens');

exports.bearerUser = function(accessToken, done) {
  co(function *() {
    try {
      let token = yield ModelAccessTokens.findOne({accessToken: accessToken}).exec();
      return yield ModelUser.findById(token.userId).exec();
    }
    catch (ex) {
      return null;
    }
  }).then(function(user) {
    done(null, user);
  });
};
