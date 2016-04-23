'use strict';

let passport = require('passport');
let User = require('../models/users');

module.exports = function() {
  passport.serializeUser(function(user, done) {
    console.log('auth/config.js 8 serializeUser = ', user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('deserializeUser == ', user);

    User.verifyId(user.passid).then(function(data) {
      console.log('verifyId err = ', data);
      console.log('user is = ', user);
      done(null, user);
    })
    .catch(function(err){
      console.log('deserial err = ', err);
      done(null, user);
    });
  });
};
