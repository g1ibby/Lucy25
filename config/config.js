"use strict";
var path = require("path");
var _ = require("lodash");

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var base = {
  app: {
    root: path.normalize(path.join(__dirname, "/..")),
    env: env,
  },
};

var specific = {
  development: {
    app: {
      port: 3031,
      name: "Koa React Gulp Mongoose Mocha - Dev",
      keys: [ "super-secret-hurr-durr" ],
    },
    mongo: {
      url: "mongodb://localhost/Lucy25",
    },
  },
  test: {
    app: {
      port: 3031,
      name: "Koa React Gulp Mongoose Mocha - Test realm",
      keys: [ "super-secret-hurr-durr" ],
    },
    mongo: {
      url: "mongodb://localhost/Lucy25_test",
    },
  },
  production: {
    app: {
      port: process.env.PORT || 3031,
      name: "Koa React Gulp Mongoose Mocha",
    },
    mongo: {
      url: "mongodb://localhost/Lucy25",
    },
  },
};

module.exports = _.merge(base, specific[env]);
