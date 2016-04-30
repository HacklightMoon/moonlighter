'use strict';
let config = require('../config/environment');

let development = {
  'clientID': 'ddf9ccf373421e6aa62d',
  'clientSecret': '4b810786513bf1910bba5293b10f4b30cc2d46e8',
  'callbackURL': 'http://127.0.0.1:3000/auth/github/callback'
};

let production = {
  'clientID': '17fad02a6b4e1d53a0d6',
  'clientSecret': '802b53f6e98025d9137b701b076832c657920c68',
  'calbackURL': 'https://powerful-ocean-19597.herokuapp.com/auth/github/callback'
};

module.exports = config.environment === "development" ? development : production;
