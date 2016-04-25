'use strict';
let express        = require('express');
let configEnv      = require('./config/environment');
let passport       = require('passport');
let bodyParser     = require('body-parser');
let cookieParser   = require('cookie-parser');
let API            = require('./API/githubQueries');
let Users = require('./models/users');
let Quests = require('./models/quests');
let passportGithub = require('./auth/github');
let Path           = require('path');
let app            = express();
let assetFolder    = Path.resolve(__dirname, '../client/');
let routes         = require('./routes/server.js');


//rootPath for path to app directory -Boothe 
let rootPath       = Path.normalize(__dirname + '../client');

//serve files in app directory, without processing them -Boothe
app.use(express.static(rootPath + '/app'));


// middleware 
app.use(passport.initialize());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(assetFolder));

// app.get('/', function (req, res) {
//   res.send('Welcome to the World of Githûb!');
// });

app.use('/', routes)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  console.log('FOR YOU FRONT_END FOLKS')
  console.log('-----ENDPOINTS------')
  console.log('GET /sampleUser, /sampleQuestData, /issues');
  console.log('POST (no endpoints yet)');
});

app.get('/auth/github/callback', passportGithub.authenticate('github', { failureRedirect: '/auth/github', successRedirect: '/' }));

// Logout route
app.get('/auth/logout', function(req,res){
  req.logout();
  req.session.destroy();
  res.clearCookie('profilePic');
  res.clearCookie('profileName');
  res.redirect('/');
})

//Authentication Route
app.get('/auth/github', passportGithub.authenticate('github', {
  scope: ['user', 'public_repo', 'notifications'] 
  })); 
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
// serve test data
configTest();

app.get('/trycall', function(req, res){
  API.firstTry('/user')//this function call needs token in header
          .then(function(resp){
            res.send(resp);
          })
        })

// Route for obtaining newly 'tagged' issues
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
      console.log("Issue", i+1, ": ", obj);
    }
    // Eventually, I will do something with this data...
    // result is equal to an array that contains all of the relevant
    // information for each Github Issue
    res.send(result);
  })
})

app.post('/user/update', function(req, res){
  console.log("server.js, 146 req.body", req.body);
  Users.update(req.body)
  .then(function(resp){
    res.send(resp);
  })
})

app.get('/user/info', function(req, res){
  console.log("server.js, 147 req.body", req.body);
  return Users.verifyId(req.body.passid)
    .then(function(resp){
      res.send(resp)
    });
});

//--------------------Quest Endpoints--------------------

app.get('/quest', function(req, res){
  return Quests.FUNCTION_NAME(req.body.questId)
  .then(function(resp){
    res.send(resp);
  });
});
