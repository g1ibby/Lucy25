import Router from 'koa-router';
import oauthserver from 'koa-oauth-server';
import mongoose from 'mongoose';
const passport = require('koa-passport');

let authModel = require('../models/models_auth');

export default function() {
  let router = new Router();

  router.get('/', function *(next) {
    let ctx = this;
    yield passport.authenticate('bearer', function *(err, user) {
      if (err) throw err;
      if (user === false) {
        ctx.throw('Not authorization', 401);
      } else {
        ctx.body = {
          'username': user.username,
          'firstname': user.firstname,
          'lastname': user.lastname
        };
      }
    }).call(this, next);
  });
  return router;
}
