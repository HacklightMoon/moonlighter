'use strict';
let passport = require('passport');
let GitHubStrategy = require('passport-github2').Strategy;

let User = require('../models/users');
let config = require('./config');
let init = require('./init');
module.exports.headers = {"User-Agent": "Moonlight"};

passport.use(new GitHubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret
    ,    callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {//accessToken needs to end up in a header variable so that it can be accessed in subsequent calls
    module.exports.headers = Object.assign({}, { 'User-Agent': 'Moonlight', 'Authorization': 'token ' + accessToken});
    User.verifyInsert(profile, accessToken).then(function(obj) {

        let send = {
          user: obj.user,
          passid: obj.passid
        };

        return done(err, send);
      })
      .catch(function(err) {
        console.log('github.js, 27 error:', err);
        return done(null, err);
      });

  }));

// serialize user into the session
init();

module.exports = passport;
