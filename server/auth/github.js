'use strict';
let passport = require('passport');
let GitHubStrategy = require('passport-github2').Strategy;

let Users = require('../models/users');
let config = require('./config');
let init = require('./init');

passport.use(new GitHubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    Users.verifyInsert(profile);    
        
    done(null, {passid: profile.id, Authorization: "token " + accessToken})
  }));

// serialize user into the session
init();

module.exports = passport;
