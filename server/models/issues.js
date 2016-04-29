'use strict';

let db = require('../db');
let Issues = module.exports;

Issues.getIssues = function(id){
  return db('issues');
};

Issues.getByUser = function(user){
  return db('issues').where({
    'user': user
  })
}

// Issues.addIssues = function(obj){
//   return db('issues').insert(obj)
//     .then(function(data){
//       return data[0]
//     })
// }

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
          return data[0]
        })
      }
    });
  });
};