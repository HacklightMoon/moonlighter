'use strict';

let db = require('../db');
let Issues = module.exports;
let Users  = require('./users');
let Promise = require('bluebird');

//getIssues: () => all issues in issues table which have not been deleted
Issues.getIssues = function(){
  return db('issues').where({
    'deleted': false
  });
};

//getByUser: userId => all issues from issues table created by user with user id
Issues.getByUser = function(userID){
  return db('issues').where({
    'user_id': userID
  });
};

//addUser: issueId, userId => add's member to issue members column of issue with id issueId
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

//getIssueMembers: issueId => array containing user rows users participating in issue
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

//getJoinedIssues: userId => array containing all issues in which user is participating
Issues.getJoinedIssues = function(userID){
  return db('issue_members').where({
    user_id: userID
  })
  .then(function(issueMembers){
    let ids = issueMembers.map(member => member.issue_id);
    return db.select('id', 'title', 'body').from('issues')
    .whereIn('id', ids)
  })
}

//addIssues: array of JSON githubIssues => issues object from issues table which has been inserted
Issues.addIssues = function(githubIssues){
  Promise.each(githubIssues, function(githubIssue){
    return db('issues').where({ 'git_id': githubIssue.id })
    .then(function(issues){
      if(issues.length === 0) {
        return Users.getByGithubUsername(githubIssue.user.login)
      }
      else{
        return db('issues')
        .where({
          'git_id': githubIssue.id
        })
        .update({
          'status': githubIssue.state
        })
        .returning('deleted');
      }
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

//removeIssue: issueID => number of rows where an issue in issues table was marked as deleted (1)
Issues.removeIssue = function(issueID){
  return db('issues').where({
    'id': issueID
  }).update({
    'deleted': true
  })
}

//getBounty: issueID => proper bounty for issue with id issueID, based on when issue was added to table
Issues.getBounty = function(issueID){
  let bounty = db.select('created_at').from('issues').where({
    id: issueID
  })  
  .then(function(time){
    let now = db.fn.now().client.pool.started;
    let daysElapsed = Math.floor((now - time[0].created_at)/86400000);
    let bounty = 100 + (10 * daysElapsed);
    return {bounty: bounty};
  })
  let members = Issues.getIssueMembers(issueID);
  return Promise.all([bounty, members])
}
