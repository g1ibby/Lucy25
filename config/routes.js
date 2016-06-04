"use strict";
var Router = require("koa-router");

import authRouter from '../src/controllers/auth';
import articleRouter from '../src/controllers/article';
import tagRouter from '../src/controllers/tag';

module.exports = function(app, passport) {
  // register functions
  var router = new Router();

  router.use(function *(next) {
    this.type = "json";
    yield next;
  });

  router.get("/", function *() {
    this.body = { home: "This home page" };
  });

  app.use(router.routes());

  let commonRouter = new Router({
    prefix: '/api'
  });
  commonRouter.use('/oauth2', authRouter().routes());
  commonRouter.use('/articles', articleRouter().routes());
  commonRouter.use('/tags', tagRouter().routes());

  app.use(commonRouter.routes());
};
