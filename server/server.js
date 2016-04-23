'use strict';
let express   = require('express');
let configEnv = require('./config/environment');
let passport  = require('passport')

// configEnv();

let app = express();
app.use(passport.initialize());
let API = require('./API/githubQueries');
let passportGithub = require('./auth/github');

// let bodyParser = require('body-parser');
// app.use(bodyParser.json());

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
app.get('/auth/github', passportGithub.authenticate('github', {scope: ['user', 'public_repo', 'notifications'] }));

app.get('/auth/github/callback', passportGithub.authenticate('github', { failureRedirect: '/auth/github', successRedirect: '/' }));

app.get('/trycall', function(req, res){
  API.firstTry('/user')
          .then(function(resp){
            res.send(resp);
          })
        })

app.get('/issues', function(req, res) {
  API.notifications()
    .then(function(resp){
      var parsed = JSON.parse(resp);
      var result = [];
      var issues = parsed.items;
      for (var i=0; i<issues.length; i++) {
        var obj = {};
        obj.title = issues[i].title;
        obj.user = issues[i].user.login;
        obj.body = issues[i].body;
        obj.issue_url = issues[i].url;
        obj.repo_url = issues[i].repository_url;
        result.push(obj);
        console.log("Object: ", obj)
      }
      // Eventually, I will do something with this data...
      // result is equal to an array that contains all of the relevant
      // information for each Github Issue
      res.send(result);
      return result;
  })
    // .then(function(issues){
    //   console.log("Response #2: ", issues);
    // })
})
