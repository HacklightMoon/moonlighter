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
  obj.forEach(function(repo){
    console.log("this be your repo" , repo)
    return db('issues').where({
      issue_url: repo.issue_url
    }).then(function(data){
      if(data.length === 0){
        return db('issues')
        .insert(repo)
        .then(function(data){
          return data
        })
      }
    });
  });
};

Issues.removeIssue = function(issueID){
  return db('issues').where({
    deleted: issueID.false
  }).update({
    deleted: true
  })
}