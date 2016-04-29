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

Issues.addIssues = function(obj){
  obj.forEach(function(repo){
  return db('issues').insert(repo)
    .then(function(data){
      return data[0]
    })
  })
}