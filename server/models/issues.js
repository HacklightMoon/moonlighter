'use strict';

let db = require('../db');
let Issues = module.exports;

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
    // TODO fill me in
  })
}

Issues.addIssues = function(obj){
  obj.forEach(function(issue){
    console.log("this be your issue" , issue)
    return db('issues').where({
      issue_url: issue.issue_url
    }).then(function(data){
      if(data.length === 0){
        return db('issues')
        .insert(issue)
        .then(function(data){
          return data
        })
      }
    });
  });
};

Issues.removeIssue = function(issueID){
  return db('issues').where({
    id: issueID
  }).update({
    deleted: true
  })
}