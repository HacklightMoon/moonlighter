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
let AuthRouter     = require('./routes/AuthRouter.js');
let IssuesRouter   = require('./routes/IssuesRouter.js');
let UsersRouter    = require('./routes/UsersRouter.js');
let CodeWarsRouter = require('./routes/CodeWarsRouter.js');

//serve files in app directory, without processing them
app.use( express.static(__dirname + '/../client') );


// middleware
app.use(session({ secret: 'hacklightmoonshine', cookie: { maxAge: 6000000 }}))
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//ROUTERS
app.use('/auth', AuthRouter);
app.use('/issues', IssuesRouter);
app.use('/user', UsersRouter);
app.use('/codewars', CodeWarsRouter);

// handle default route
app.get('/*', function(req, res) {
  res.sendFile( assetFolder + '/index.html' )
});

app.get('/trycall', function(req, res){
  API.getCurrentUser(req.user.Authorization)
  .then(function(resp){
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

app.listen(config.port || 3000, function () {
  console.log("process.env.PORT", config.port);
  console.log('-----ENDPOINTS------');
  console.log('GET /sampleUser, /sampleQuestData, /issues, \n /issues/joined, /issues/bounty, /issues/members, \n /issues/myissues, /issues/load, /user/contribs, \n /user/current, /user/info, /character, auth/logout');
  console.log('');
  console.log('POST /quest/newquest, user/notified, /user/pay, \n /user/update, /issues/addmember');
});
