let express        = require('express');
let Path           = require('path');
let AuthRouter     = express.Router();
let passportGithub = require('./../auth/github');

AuthRouter.get('/github/callback', passportGithub.authenticate('github', {
  failureRedirect: '/auth/github',
  successRedirect: '/'
}));

// Logout route
AuthRouter.get('/logout', function(req,res){
  req.session.destroy(function(){
    res.clearCookie('connect.sid');
    req.signedCookies = null;
    req.logout();
    res.redirect('/');
  });
});

//Authentication Route
AuthRouter.get('/github', passportGithub.authenticate('github', {
  scope: ['user', 'public_repo', 'notifications']
}));

module.exports = AuthRouter;

