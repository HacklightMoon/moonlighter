'use strict';
let express        = require('express');
let configEnv      = require('./config/environment');
let passport       = require('passport');
let bodyParser     = require('body-parser');
let cookieParser   = require('cookie-parser');
let API            = require('./API/githubQueries');
let passportGithub = require('./auth/github');

// configEnv();

let app = express();

// middleware 
app.use(passport.initialize());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('Welcome to the World of Githûb!');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  console.log('FOR YOU FRONT_END FOLKS')
  console.log('GET /sampleUser, /sampleQuest');
  console.log('POST (no endpoints yet)');
});

//Authentication Route
app.get('/auth/github', passportGithub.authenticate('github', { }));

app.get('/auth/github/callback', passportGithub.authenticate('github', { failureRedirect: '/auth/github', successRedirect: '/' }));

app.get('/trycall', function(req, res){
  API.firstTry('/user/matjkel')
          .then(function(resp){
            res.send(resp);
          })
        })

// Logout route
app.get('/auth/logout', function(req,res){
  req.logout();
  req.session.destroy();
  res.clearCookie('profilePic');
  res.clearCookie('profileName');
  res.redirect('/');
})

 var configTest = function(){

  var sampleQuest = [
  {
    "id": 7, 
    "type": "project",
    "description": "Web-App",
    "name": "BadBoy Fantasy",
    "tech": ["AngularJS", "Postgres", "Node.js", "Express.js"],
    "url": "https://github.com/richardjboothe",
    "developers": 4,
    "roles": ['Designer', 'Front-end', 'Front-end', 'Back-end'],
    "pay": "equity"
  },
  {
    "id": 8, 
    "type": "project",
    "description": "Mobile App and Web-App",
    "name": "HollR",
    "tech": ["Ruby", "Postgres", "Ruby on Rails"],
    "url": "https://github.com/richardjboothe",
    "developers": 4,
    "roles": ['Designer', 'Front-end', 'Front-end', 'Back-end'],
    "pay": "equity"
  }
  ]

  var sampleUser = [
  {
    "id": 3,
    "username":"Fane Borges",
    "role": "Web Designer",
    "skills": ['JavaScript', 'React', 'HTML/CSS'],
    "projects": ["Chef's Pantry", "NabrHood"]
  },
  {
    "id": 4,
    "username":"Treznor Lobo",
    "role": "Web Designer",
    "skills": ['Ruby', 'Rails', 'HTML/CSS'],
    "projects": ["HollR"]
  }
  ]

  app.get('/sampleQuestData', function(req, res){
    res.send(sampleQuest)
  })

  app.get('/sampleUser', function(req, res){
    res.send(sampleUser)
  })

}
