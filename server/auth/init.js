'use strict';

let passport = require('passport');
let User = require('../models/users');

module.exports = function() {
  passport.serializeUser(function(session, done) {
    console.log("serializing session:", session);
    done(null, session);
  });

  passport.deserializeUser(function(session, done) {

    User.verifyId(session.passid).then(function(data) {
      let outSession = { data, Authorization: session.Authorization }
      console.log("deserializing session:", outSession);
      done(null, outSession);
    })
    .catch(function(err){
      done(null, session);
    });
  });
};
