'use strict';

let db = require('../db');
let Issues = module.exports;
let Users  = require('./users');
let Promise = require('bluebird');

Issues.getIssues = function(){
  return db('issues').where({
    'deleted': false
  });
};

Issues.getByUser = function(userID){
  return db('issues').where({
    'user_id': userID
  });
};

Issues.addUser = function(issueID, userID){
  let target = {issue_id: issueID, user_id:userID}
  return db('issue_members').where(target)
  .then(function(issues){
    if (issues.length === 0){
      return db('issue_members')
      .insert(target)
    }
    else return;
  })
}

Issues.getIssueMembers = function(issueID){
  return db('issue_members').where({
    issue_id: issueID
  })
  .then(function(issueMembers){
    let ids = issueMembers.map(member => member.user_id);
    return db.select('id', 'github_username').from('users')
    .whereIn('id', ids)
  })
}

Issues.addIssues = function(githubIssues){
  Promise.each(githubIssues, function(githubIssue){
    return db('issues').where({ 'git_id': githubIssue.id })
    .then(function(issues){
      if(issues.length === 0) {
        return Users.getByGithubUsername(githubIssue.user.login)
      }
      else return false;
    })
    .then(function(user){
      if (user && user[0]){
        let issue = {};
        issue.user_id = user[0].id;
        issue.git_id = githubIssue.id;
        issue.title = githubIssue.title;
        issue.user = githubIssue.user.login;
        issue.body = githubIssue.body;
        issue.issue_url = githubIssue.html_url;
        issue.repo_url = githubIssue.repository_url;
        issue.status = githubIssue.state;
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

Issues.getBounty = function(issueID){
  let bounty = db.select('created_at').from('issues').where({
    id: issueID
  })  
  .then(function(time){
    console.log("issues.js 74, time is: ", time[0].created_at);
    let now = db.fn.now().client.pool.started;
    console.log("NOW: ", now);
    let daysElapsed = Math.floor((now - time[0].created_at)/86400000);
    console.log("issues.js 76 daysElapsed is: ", daysElapsed);
    let bounty = 100 + (10 * daysElapsed);
    return {bounty: bounty};
  })
  let members = Issues.getIssueMembers(issueID);
  return Promise.all([bounty, members])
}

