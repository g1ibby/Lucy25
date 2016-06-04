import Router from 'koa-router';
const passport = require('koa-passport');

import {byId, list, create, update} from '../service/article';

export default function() {
  let router = new Router();

  router.get('/', function *() {
    let page = (this.request.query.page > 0 ? this.request.query.page : 1) - 1;
    let perPage = 5;
    let options = {
      perPage: perPage,
      page: page
    };
    this.body = yield list(options);
  });
  router.get('/:id', function *() {
    this.body = yield byId(this.params.id);
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
