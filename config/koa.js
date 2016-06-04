"use strict";
const session = require("koa-generic-session");
const MongoStore = require("koa-sess-mongo-store");
const responseTime = require("koa-response-time");
const logger = require("koa-logger");
const compress = require("koa-compress");
const errorHandler = require("koa-error");
const bodyParser = require("koa-bodyparser");

const STATIC_FILES_MAP = {};
const SERVE_OPTIONS = { maxAge: 365 * 24 * 60 * 60 };

module.exports = function(app, config, passport) {
  if (!config.app.keys) { throw new Error("Please add session secret key in the config file!"); }
  app.keys = config.app.keys;

  if (config.app.env !== "test") {
    app.use(logger());
  }

  app.use(errorHandler());

  app.use(session({
    key: "koareactfullexample.sid",
    store: new MongoStore({ url: config.mongo.url }),
  }));

  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(compress());
  app.use(responseTime());
};
