'use strict';
let express      = require('express');
let Path         = require('path');
let IssuesRouter = express.Router();
let API          = require('./../API/githubQueries');
let Issues       = require('./../models/issues');


//--------------------Issues Endpoints--------------------

// Route for obtaining newly 'tagged' issues
IssuesRouter.get('/', function(req, res) {
  API.notifications()
  .then(function(resp){
    let parsed = JSON.parse(resp);
    let issues = parsed.items;
    return Issues.addIssues(issues);
  })
  .then(function(issues){
    res.send(issues);
  });
});

IssuesRouter.get('/load', function(req, res){
  Issues.getIssues()
  .then(function(resp){
    res.send(resp);
  });
});

IssuesRouter.post('/addmember', function(req, res) {
  Issues.addUser(req.body.issue_id, req.body.user_id)
  .then(function(resp) {
    res.send(resp);
  });
});

IssuesRouter.get('/myissues', function(req, res){
  Issues.getByUser(req.query.id)
  .then(function(resp) {
    res.send(resp);
  });
});

IssuesRouter.get('/members', function(req, res){
  Issues.getIssueMembers(req.query.id)
  .then(function(resp) {
    res.send(resp);
  });
});

IssuesRouter.get('/bounty', function(req, res){
  Issues.getBounty(req.query.id)
  .then(function(resp) {
    res.send(resp);
  });
});

IssuesRouter.get('/joined', function(req, res){
  Issues.getJoinedIssues(req.query.id)
  .then(function(resp) {
    res.send(resp);
  });
});

module.exports = IssuesRouter;

