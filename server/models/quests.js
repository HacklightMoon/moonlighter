'use strict';

let Promise = require('bluebird'); //remove this once babel is available.
let db = require('../db');
let Users = require('./users');
let Quests = module.exports;

Quests.create = function(obj) {
  return db('quests').insert(obj)
    .then(function(data){
      return data[0]
    });
}

Quests.remove = function(id){
  return db('quests')
  .where({
    'id': id
  }).del();
}

Quests.getById = function(id){
  return db('quests').where({
    'id': id
  }).limit(1);
};

Quests.getByTitle = function(title){
  return db('quests').where({
    'title': title
  });
};

Quests.getByType = function(type){
  return db('quests').where({
    'type': type
  });
};

Quests.getByCreator = function(github_username){
  return db('users').where({
    'github_username': github_username
  }).select('id').limit(1)
  .then(function(id){
    return db('quests').where({
      'creator': id
    });
  });
};

Quests.getByTechnology = function(name){
  return db('technologies').where({
    'name': name
  }).select('id').limit(1)
  .then(function(id){
    return db('quests_technologies').where({
      'technology_id': id
    }).select('quest_id')
  })
  .then(function(ids){
    return db('quests').whereIn('id', ids);
  });
}

Quests.getAll = function(){
  return db('quests');
};
