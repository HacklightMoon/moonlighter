'use strict';
let express = require('express');
let configEnv = require('./config/environment');

configEnv();

let app = express();
let passportGithub = require('./auth/github');

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  console.log('GET /');
  console.log('POST (no endpoints yet)');
});

//Authentication Route
app.get('/auth/github', passportGithub.authenticate('github', {

}));

app.get('/auth/github/callback',
           passportGithub.authenticate('github', {
             failureRedirect: '/auth/github',
             successRedirect: '/'

           }));
