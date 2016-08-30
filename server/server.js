'use strict';
let express        = require('express');
let app            = express();
let config         = require('./config/environment');
let passport       = require('passport');
let bodyParser     = require('body-parser');
let cookieParser   = require('cookie-parser');
let API             = require('./API/githubQueries');
let session         = require('express-session');
let AuthRouter      = require('./routes/AuthRouter.js');
let IssuesRouter    = require('./routes/IssuesRouter.js');
let UsersRouter     = require('./routes/UsersRouter.js');
let CodeWarsRouter  = require('./routes/CodeWarsRouter.js');
let CharacterRouter = require('./routes/CharacterRouter.js');

//serve files in app directory, without processing them
app.use( express.static(__dirname + '/../client') );

// middleware
app.use(session({ secret: 'hacklightmoonshine', cookie: { maxAge: 6000000 }}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//ROUTERS
app.use('/auth', AuthRouter);
app.use('/issues', IssuesRouter);
app.use('/user', UsersRouter);
app.use('/codewars', CodeWarsRouter);
app.use('/character', CharacterRouter);

app.get('/trycall', function(req, res){
  API.getCurrentUser(req.user.Authorization)
  .then(function(resp){
    res.send(resp);
  });
});

//ESTABLISH CONNECTION WITH LISTEN
app.set( 'port', (process.env.PORT || 3000) );
app.listen(app.get('port'), function () {
  console.log("Moonlighter site is running on", app.get('port'));
});
