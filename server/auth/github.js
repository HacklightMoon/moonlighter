'use strict';
let passport = require('passport');
let GitHubStrategy = require('passport-github2').Strategy;

let Users = require('../models/users');
let config = require('./config');
let init = require('./init');

passport.use(new GitHubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret
    //,callbackURL: config.github.callbackURL,
    //userAgent: //fill this in
  },
  function(accessToken, refreshToken, profile, done) {
    Users.verifyInsert(profile);    
      console.log("trying to serialize:", {profile, accessToken})
        
    done(null, {passid: profile.id, Authorization: "token " + accessToken})
  }));

// serialize user into the session
init();

module.exports = passport;
