'use strict';

let Promise = require('bluebird'); //remove this once babel is available.
let db = require('../db');
let Issues = module.exports;

Issues.getIssues = function(id){
  return db('issues')
}

Issues.getByUser = function(user){
  return db('issues').where({
    'user': user
  }).select('id')
}