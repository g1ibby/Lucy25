import Router from 'koa-router';
import oauthserver from 'koa-oauth-server';
import mongoose from 'mongoose';

let authModel = require('../models/entity/models_auth');

export default function() {
  let router = new Router();

  // Create OAuth2 server for authorization
  let oauth = oauthserver({
    model: authModel,
    grants: ['password', 'refresh_token'],
    debug: true
  });
  router.post('/token', oauth.grant());
  router.post('/reg', function *() {
    const ModelUser = mongoose.model('Users');
    if (!this.request.body) {
      this.throw('The body is empty', 400);
    }

    if (!this.request.body.username) {
      this.throw('Missing username', 400);
    }
    if (!this.request.body.password) {
      this.throw('Missing password', 400);
    }
    try {
      let user = new ModelUser({username: this.request.body.username, password: this.request.body.password});
      user = yield user.save();
      this.status = 200;
      this.body = {user: user};
    }
    catch (err) {
      this.throw(err);
    }
  });
  return router;
}
