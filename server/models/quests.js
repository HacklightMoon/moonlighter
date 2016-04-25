'use strict';

let Promise = require('bluebird'); //remove this once babel is available.
let db = require('../db');
let Quests = module.exports;

Quests.getById = function(id){
  return db('quests').where({
    'id': id
  }).limit(1);
}

Quests.getByTitle = function(title){
  return db('quests').where({
    'title': title
  });
}

Quests.getByType = function(type){
  return db('quests').where({
    'type': type
  });
}
