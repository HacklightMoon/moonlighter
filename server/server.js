'use strict';
let express        = require('express');
let config         = require('./config/environment');
let debug          = require('./debug');
let passport       = require('passport');
let bodyParser     = require('body-parser');
let cookieParser   = require('cookie-parser');
let API            = require('./API/githubQueries');
let CW             = require('./API/codewars');
let Users          = require('./models/users');
let Issues         = require('./models/issues');
let Character      = require('./models/characters');
let passportGithub = require('./auth/github');
let Path           = require('path');
let session        = require('express-session');
let app            = express();
let assetFolder    = Path.resolve(__dirname, '../client/');
let routes         = require('./routes/server.js');


//rootPath for path to app directory
let rootPath = Path.normalize(__dirname + '../client');

//serve files in app directory, without processing them
app.use("/app", express.static(rootPath + '/app'));
app.use("/lib", express.static(rootPath + '/lib'));
app.use("/style", express.static(rootPath + '/style'));


// middleware
app.use(session({ secret: 'hacklightmoonshine', cookie: { maxAge: 6000000 }}))
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))




app.get('/auth/github/callback', passportGithub.authenticate('github', {
  failureRedirect: '/auth/github',
  successRedirect: '/'
}));

// Logout route
app.get('/auth/logout', function(req,res){
  req.session.destroy(function(){
    res.clearCookie('connect.sid');
    req.signedCookies = null;
    req.logout();
    res.redirect('/');
  });
})

//Authentication Route
app.get('/auth/github', passportGithub.authenticate('github', {
  scope: ['user', 'public_repo', 'notifications']
}));

app.get('/trycall', function(req, res){
  API.getCurrentUser(req.user.Authorization)
  .then(function(resp){
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
  Issues.getJoinedIssues(req.query.id)
  .then(function(resp) {
    res.send(resp);
  });
});
//--------------------Character Endpoints----------------

app.get('/character', function(req, res){
  Character.getByLevel(req.query.level)
  .then(function(characters){
    res.send(characters[0]);
  })
  .catch(function(err){
    console.error(err);
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
    console.log("your resp in server sir", resp);
    res.send(resp);

  });
});

app.get('/user/current', function(req, res){
  if(req.user) {
    API.getCurrentUser(req.user.Authorization)
    .then(function(blob){
      return Users.getByLoggedIn(blob).then(function(users){
        res.send(users[0]);
      });
    });
  }
});

app.post('/user/pay', function(req, res){
  Users.pay(req.body.user_id, req.body.amount)
  .then(function(){
    Issues.removeIssue(req.body.issue_id)
    .then(function() {
      res.sendStatus(201);
    });
  });
});

app.get('/user/contribs', function(req, res){
  if(req.user){
    Users.updateContribs(req.user.user.github_username)
    .then(function(resp){
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

app.get('/user/newcontribs', function(req, res) {
  Users.updateContribs(req.query.username)
  .then(function(resp) {
    res.send(resp);
  })
})

//--------------------CodeWars Endpoints--------------------
app.get('/codewars/user', function(req, res){
  CW.GetUserStats()
  .then(function(codewar){
    res.send(codewar);
  });
});

app.get('/codewars/nextChallenge', function(req, res){
  CW.GetChallenge(req.query.challengeType)
  .then(function(challenge){
    res.send(challenge);
  });
});

app.post('/codewars/testSolution', function(req, res){
  console.log("/codewars/testSolution", req.query.code);
  CW.testSolution(req.query.code)
  .then(function(challenge){
    console.log("okay so here is la challenge:", challenge)
    res.send(challenge);
  })
  .then(function(){
    return CW.getDeferred()
  .then(function(resp){
    console.log("I got to the 2nd part of testSolution and heres your response:", resp)
    res.send(resp);
    });
  });
});

app.post('/codewars/finalSolution', function(req, res){
  CW.finalSolution()
  .then(function(resp){
    res.send(resp);
  });
});


// links a codewars' users api key
app.post('/codewars/api', function(req, res){
  Users.linkCodewars(req.body.userID, req.body.cwUsername, req.body.cwUserAPI)
  .then(function(resp){
    res.send(resp[0]);
  })
  .catch(function(err){
    console.log("error:", err);
  });
});

app.get('/codewars', function(req, res){
  if(req.user){


    API.getCurrentUser(req.user.Authorization)
    .then(function(blob){
      return Users.getByLoggedIn(blob)
      .then(function(users){
        let user = users[0];
        return CW.GetUserStats(user.codewars_username)
        .then(function(blob){
          res.send(blob);
        })
        .catch(function(err){
          console.log('err:', err);
          return;
        });
      });
    });
  }
});


app.use('/', routes);

app.listen(config.port || 3000, function () {
  console.log("process.env.PORT", config.port);
  console.log('-----ENDPOINTS------');
  console.log('GET /sampleUser, /sampleQuestData, /issues, \n /issues/joined, /issues/bounty, /issues/members, \n /issues/myissues, /issues/load, /user/contribs, \n /user/current, /user/info, /character, auth/logout');
  console.log('');
  console.log('POST /quest/newquest, user/notified, /user/pay, \n /user/update, /issues/addmember');
});
