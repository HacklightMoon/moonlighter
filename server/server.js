'use strict';
let express = require('express');
let configEnv = require('./config/environment');

// configEnv();

let app = express();
let API = require('./API/githubQueries');
let passportGithub = require('./auth/github');

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  console.log('GET /');
  console.log('POST (no endpoints yet)');
});

// Logout route
app.get('/auth/logout', function(req,res){
  req.logout();
  req.session.destroy();
  res.clearCookie('profilePic');
  res.clearCookie('profileName');
  res.redirect('/');
})

//Authentication Route
app.get('/auth/github', passportGithub.authenticate('github', { }));

app.get('/auth/github/callback', passportGithub.authenticate('github', { failureRedirect: '/auth/github', successRedirect: '/' }));

app.get('/trycall', function(req, res){
  API.firstTry('/users/clambodile')
          .then(function(resp){
            res.send(resp);
          })
        })
