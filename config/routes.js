"use strict";
var Router = require("koa-router");

import authRouter from '../src/controllers/auth';
import bookmarkRouter from '../src/controllers/bookmark';
import tagRouter from '../src/controllers/tag';
import bootstrapRouter from '../src/controllers/bootstrap';

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
  commonRouter.use('/bookmarks', bookmarkRouter().routes());
  commonRouter.use('/tags', tagRouter().routes());
  commonRouter.use('/bootstrap', bootstrapRouter().routes());

  app.use(commonRouter.routes());
};
