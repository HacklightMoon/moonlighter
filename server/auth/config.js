'use strict';
let config = require('../config/environment');

let development = {
  'clientID': process.env.GITHUB_CLIENT_ID_DEVELOPMENT,
  'clientSecret': process.env.GITHUB_CLIENT_SECRET_DEVELOPMENT,
  'callbackURL': process.env.CALLBACK_URL_DEVELOPMENT
};

let production = {
  'clientID': process.env.GITHUB_CLIENT_ID_PRODUCTION,
  'clientSecret': process.env.GITHUB_CLIENT_SECRET_PRODUCTION,
  'callbackURL': process.env.CALLBACK_URL_PRODUCTION
};

module.exports = config.environment === "production" ? production : development;
