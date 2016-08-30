let express      = require('express');
let Path         = require('path');
let UsersRouter  = express.Router();
let Users        = require('./../models/users');
let API          = require('./../API/githubQueries');
let Issues       = require('./../models/issues');

/*-------------------- User Endpoints --------------------*/

UsersRouter.post('/update', function(req, res){
  Users.update(req.body)
  .then(function(resp){
    res.send(resp);
  });
});

UsersRouter.get('/info', function(req, res){
  return Users.getById(req.query.id)
  .then(function(resp){
    res.send(resp);
  });
});

UsersRouter.get('/current', function(req, res){
  if(req.user) {
    API.getCurrentUser(req.user.Authorization)
    .then(function(blob){
      return Users.getByLoggedIn(blob).then(function(users){
        res.send(users[0]);
      });
    });
  }
});

UsersRouter.post('/pay', function(req, res){
  Users.pay(req.body.user_id, req.body.amount)
  .then(function(){
    Issues.removeIssue(req.body.issue_id)
    .then(function() {
      res.sendStatus(201);
    });
  });
});

UsersRouter.get('/contribs', function(req, res){
  if(req.user){
    Users.updateContribs(req.user.user.github_username)
    .then(function(resp){
      res.send({contribs: resp});
    });
  }
});

UsersRouter.post('/notified', function(req, res){
  Users.contribsSeen(req.body.user_id)
  .then(function(user){
    res.send(user);
  });
});

UsersRouter.get('/newcontribs', function(req, res) {
  Users.updateContribs(req.query.username)
  .then(function(resp) {
    res.send(resp);
  });
});

module.exports = UsersRouter;

