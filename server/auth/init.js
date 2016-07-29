'use strict';

let passport = require('passport');
let User = require('../models/users');

module.exports = function() {
  passport.serializeUser(function(session, done) {

    done(null, session);
  });

  passport.deserializeUser(function(session, done) {

    User.verifyId(session.passid).then(function(data) {

      let outSession = { user: data[0], Authorization: session.Authorization }

      done(null, outSession);
    })
    .catch(function(err){
      done(null, session);
    });
  });
};
