'use strict';
let express        = require('express');
let config         = require('./config/environment');
let passport       = require('passport');
let bodyParser     = require('body-parser');
let cookieParser   = require('cookie-parser');
let API            = require('./API/githubQueries');
let Users          = require('./models/users');
let Issues         = require('./models/issues'); 
let Character      = require('./models/characters');
let passportGithub = require('./auth/github');
let Path           = require('path');
let session        = require('express-session');
let app            = express();
let assetFolder    = Path.resolve(__dirname, '../client/');
let routes         = require('./routes/server.js');


//rootPath for path to app directory -Boothe 
let rootPath = Path.normalize(__dirname + '../client');

//serve files in app directory, without processing them -Boothe
app.use("/app", express.static(rootPath + '/app'));
app.use("/lib", express.static(rootPath + '/lib'));
app.use("/style", express.static(rootPath + '/style'));


// middleware 
app.use(session({ secret: 'hacklightmoonshine', cookie: { maxAge: 600000 }}))
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))




app.get('/auth/github/callback', passportGithub.authenticate('github', { failureRedirect: '/auth/github', successRedirect: '/' }));

// Logout route 
// TODO fix logout route
app.get('/auth/logout', function(req,res){
  req.session.destroy(function(){
    res.clearCookie('connect.sid');
    req.signedCookies = null;
    req.logout();
    res.redirect('/');
  });
  // res.clearCookie('profileName');
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
      "picture":"faneborges.png",
      "email":"faneborges@moonligth.com",
      "username":"Fane Borges",
      "role": "Web Designer",
      "skills": ['JavaScript', 'React', 'HTML/CSS'],
      "projects": ["Chef's Pantry", "NabrHood"]
    },
    {
      "id": 4,
      "picture":"treznorlobo.png",
      "email":"treznorlobo@moonligth.com",
      "username":"Treznor Lobo",
      "role": "Web Designer",
      "skills": ['Ruby', 'Rails', 'HTML/CSS'],
      "projects": ["HollR"]
    }
  ]

  app.get('/sampleQuestData', function(req, res){
    res.send(sampleQuest)
  });

  app.get('/sampleUser', function(req, res){
    res.send(sampleUser)
  });

};
// serve test data
configTest();

app.get('/trycall', function(req, res){
  //res.set('Authorization', req.user['Authorization'])
  API.getCurrentUser(req.user.Authorization)//this function call needs token in header
  .then(function(resp){
    //console.log("req.user['Authorization']", req.user['Authorization'])
    res.send(resp);
  });
});

//--------------------Issues Endpoints--------------------

// Route for obtaining newly 'tagged' issues
app.get('/issues', function(req, res) {
  API.notifications()
  .then(function(resp){
    var parsed = JSON.parse(resp);
    var issues = parsed.items;
    return Issues.addIssues(issues);
  })
  .then(function(issues){
    res.send(issues);
  });
});

app.get('/issues/load', function(req, res){
  Issues.getIssues()
  .then(function(resp){
    res.send(resp);
  });
});

app.post('/issues/addmember', function(req, res) {
  Issues.addUser(req.body.issue_id, req.body.user_id)
  .then(function(resp) {
    res.send(resp);
  });
});

app.get('/issues/myissues', function(req, res){
  Issues.getByUser(req.query.id)
  .then(function(resp) {
    res.send(resp);
  });
});

app.get('/issues/members', function(req, res){
  console.log("REQ in server.js", req.query.id);
  Issues.getIssueMembers(req.query.id)
  .then(function(resp) {
    res.send(resp);
  });
});

app.get('/issues/bounty', function(req, res){
  Issues.getBounty(req.query.id)
  .then(function(resp) {
    res.send(resp);
  });
});
app.get('/issues/joined', function(req, res){
  console.log("REQ in server.js", req.query.id);
  Issues.getJoinedIssues(req.query.id)
  .then(function(resp) {
     res.send(resp);
  });
});
//--------------------Character Endpoints----------------
//NOT FULLY FUNCTIONAL !!!!
app.get('/character', function(req, res){
  console.log('server.js, 187 req.body', req.body);
  Character.getAll()
  .then(function(resp){
    // res.set('Content-type', 'image/png')
    res.send(resp);
  })
  .catch(function(err){
    console.error(err)
  });
});

//--------------------User Endpoints--------------------

app.post('/user/update', function(req, res){
  Users.update(req.body)
  .then(function(resp){
    res.send(resp);
  });
});

app.get('/user/info', function(req, res){
  return Users.getById(req.query.id)
  .then(function(resp){
    res.send(resp)
  });
});

app.get('/user/current', function(req, res){
  //Users.getByLoggedIn()
  if(req.user) {
    API.getCurrentUser(req.user.Authorization)//this function call needs token in header
    .then(function(blob){
      return Users.getByLoggedIn(blob).then(function(users){
        let user = users[0]; 
        res.send(user || null);
      });
    });
  };
});

app.post('/user/pay', function(req, res){
  Users.pay(req.body.user_id, req.body.amount)
  .then(function(){
    Issues.removeIssue(req.body.issue_id)
    .then(function() {
      res.sendStatus(201);
    })
  })
})

app.get('/user/contribs', function(req, res){
  if(req.user){
    Users.updateContribs(req.user.user.github_username)
    .then(function(resp){
      console.log("RESPONSE IN SERVER.JS: ", resp);
      res.send({contribs: resp});
    })
  }
})

app.post('/user/notified', function(req, res){
  Users.contribsSeen(req.body.user_id)
  .then(function(user){
    res.send(user);
  });
});

app.use('/', routes)

app.listen(config.port || 3000, function () {
  console.log("process.env.PORT", config.port)
  console.log('Example app listening on port 3000!');
  console.log('');
  console.log('FOR YOU FRONT_END FOLKS');
  console.log('')
  console.log('-----ENDPOINTS------');
  console.log('GET /sampleUser, /sampleQuestData, /issues, \n /issues/joined, /issues/bounty, /issues/members, \n /issues/myissues, /issues/load, /user/contribs, \n /user/current, /user/info, /character, auth/logout');
  console.log('');
  console.log('POST /quest/newquest, user/notified, /user/pay, \n /user/update, /issues/addmember');
});



