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


//rootPath for path to app directory -Boothe 
let rootPath = Path.normalize(__dirname + '../client');

//serve files in app directory, without processing them -Boothe
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

app.get('/trycall', function(req, res){
  API.getCurrentUser(req.user.Authorization)//this function call needs token in header
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

let count_user_current = debug.countLog('/user/current called');
app.get('/user/current', function(req, res){
  count_user_current();
  if(req.user) {
    API.getCurrentUser(req.user.Authorization)//this function call needs token in header
    .then(function(blob){
      return Users.getByLoggedIn(blob).then(function(users){
        res.send(users[0]);
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
  console.log("USERNAME:", req.query.username);
  Users.updateContribs(req.query.username)
  .then(function(resp) {
    console.log("RESPONSE IN SERVER.JS (newcontribs): ", resp);
    res.send(resp);
  })
})

//--------------------CodeWars Endpoints--------------------
app.get('/codewars/user', function(req, res){
  console.log('server.js:253');
  CW.GetUserStats()
  .then(function(codewar){
    res.send(codewar);
  });
});

app.get('/codewars/nextChallenge', function(req, res){
  console.log('server.js:264');
  CW.GetNextChallenge()
  .then(function(challenge){
    res.send(challenge);
  });
});

//INSERT DB FUNCTION HERE VVVVV
app.post('/codewars/api', function(req, res){
  console.log("req.body", req.body)
  Users.linkCodewars(req.body.userID, req.body.cwUsername, req.body.cwUserAPI)
  .then(function(resp){
    res.send(resp[0]);
  })
  .catch(function(err){
    console.log("error:", err);
  })
});

app.get('/codewars', function(req, res){
  if(req.user){
    API.getCurrentUser(req.user.Authorization)
    .then(function(blob){
      return Users.getByLoggedIn(blob)
      .then(function(users){
        console.log("/codewars users = ", users);
        let user = users[0];
        return CW.GetUserStats(user.codewars_username)
        .then(function(blob){
          res.send(blob);
        })
        .catch(function(err){
          console.log('err:', err);
          return;
        })
      });
    });
  }
});


app.use('/', routes);

// app.all('/*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
//   next();
// });

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



