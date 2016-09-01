'use strict';
var express         = require('express');
var Path            = require('path');
var CodeWarsRouter  = express.Router();
var API             = require('./../API/githubQueries');
var CW              = require('./../API/codewars');

//--------------------CodeWars Endpoints--------------------

CodeWarsRouter.get('/', function(req, res){
  if(req.user){
    API.getCurrentUser(req.user.Authorization)
    .then(function(blob){
      return Users.getByLoggedIn(blob)
      .then(function(users){
        var user = users[0];
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

CodeWarsRouter.get('/user', function(req, res){
  CW.GetUserStats()
  .then(function(codewar){
    res.send(codewar);
  });
});

CodeWarsRouter.get('/nextChallenge', function(req, res){
  CW.GetChallenge(req.query.challengeType)
  .then(function(challenge){
    res.send(challenge);
  });
});

CodeWarsRouter.post('/testSolution', function(req, res){
  CW.testSolution(req.query.code)
  .then(function(challenge){ res.send(challenge); })
  .then(function(){
    return CW.getDeferred().then( function(resp) { res.send(resp); } );
  });
});

CodeWarsRouter.post('/finalSolution', function(req, res){
  CW.finalSolution()
  .then(function(resp){
    res.send(resp);
  });
});


// links a codewars' users api key
CodeWarsRouter.post('/api', function(req, res){
  Users.linkCodewars(req.body.userID, req.body.cwUsername, req.body.cwUserAPI)
  .then(function(resp){
    res.send(resp[0]);
  })
  .catch(function(err){
    console.log("error:", err);
  });
});

module.exports = CodeWarsRouter;

