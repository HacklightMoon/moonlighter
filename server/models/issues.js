'use strict';

let db = require('../db');
let Issues = module.exports;
let Users  = require('./users');
let Promise = require('bluebird');

Issues.getIssues = function(){
  return db('issues');
};

Issues.getByUser = function(user){
  return db('issues').where({
    'user': user.user
  });
};

Issues.addUser = function(issueID, userID){
  return db('issue_members').where({
    user_id: userID, 
    issue_id: issueID
  }).insert(issueID, userID)
    .then(function(data){
      return data
    });
}


Issues.addIssues = function(githubIssues){
  Promise.each(githubIssues, function(githubIssue){
    return Users.getByGithubUsername(githubIssue.user.login)
    .then(function(user){
      console.log('the .then was called with user:', user);
      if (user[0]){
        let issue = {};
        issue.user_id = user[0].id;
        issue.title = githubIssue.title;
        issue.user = githubIssue.user.login;
        issue.body = githubIssue.body;
        issue.issue_url = githubIssue.url;
        issue.repo_url = issue.repository_url;
        issue.status = issue.state;
        return db('issues').insert(issue);
      }
      else return;
    })
  })
}

Issues.removeIssue = function(issueID){
  return db('issues').where({
    id: issueID
  }).update({
    deleted: true
  })
}
