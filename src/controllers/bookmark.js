import Router from 'koa-router';
const passport = require('koa-passport');

import {byId, list, create, update} from '../service/bookmark';

export default function() {
  let router = new Router();

  router.get('/', function *(next) {
    let ctx = this;
    yield passport.authenticate('bearer', function *(err, user) {
      if (err) throw err;
      if (user === false) {
        ctx.throw('Not authorization', 401);
      } else {
        const option = {};
        if (ctx.request.query['filter[collection]']) {
          option.tag = ctx.request.query['filter[collection]'];
        }
        ctx.body = yield list(option);
      }
    }).call(this, next);
  });
  router.get('/:id', function *(next) {
    let ctx = this;
    yield passport.authenticate('bearer', function *(err, user) {
      if (err) throw err;
      if (user === false) {
        ctx.throw('Not authorization', 401);
      } else {
        ctx.body = yield byId(this.params.id);
      }
    }).call(this, next);
  });
  router.post('/', function *(next) {
    let ctx = this;
    yield passport.authenticate('bearer', function *(err, user) {
      if (err) throw err;
      if (user === false) {
        ctx.throw('Not authorization', 401);
      }
      else {
        if (!ctx.request.body) {
          ctx.throw('The body is empty', 400);
        }
        console.log(ctx.request.body);
        ctx.body = yield create(ctx.request.body, user);
      }
    }).call(this, next);
  });
  router.put('/:id', function *(next) {
    let ctx = this;
    yield passport.authenticate('bearer', function *(err, user) {
      if (err) throw err;
      if (user === false) {
        ctx.throw('Not authorization', 401);
      }
      else {
        if (!ctx.request.body) {
          ctx.throw('The body is empty', 400);
        }
        ctx.body = yield update(ctx.params.id, ctx.request.body, user);
      }
    }).call(this, next);
  });
  return router;
}
