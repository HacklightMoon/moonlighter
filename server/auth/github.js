'use strict';
let passport = require('passport');
let GitHubStrategy = require('passport-github2').Strategy;

let User = require('../models/users');
let config = require('./config');
let init = require('./init');


passport.use(new GitHubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret
    //,    callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {//accessToken needs to end up in a header variable
    //    console.log("this is your profile", profile)//so that it can be accessed in subsequent calls
    User.verifyInsert(profile).then(function(obj) {
        console.log('inserted via github = ', obj);

        let send = {
          user: obj.user,
          passid: obj.passid
        };

        return done(null, send);
      })
      .catch(function(err) {
        console.log('vi prom err = ', err);
        return done(null, err);
      });

  }));

// serialize user into the session
init();

module.exports = passport;
