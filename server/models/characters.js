'use strict';

let db = require('../db');
let Character = module.exports;
let Promise = require('bluebird');

Character.getExpFromContribs = function(contribs){
  return contribs * 17;
};

Character.getLevelFromExp = function(exp){
  let remainder = exp;
  let level = 0;
  let interval = 0;
  while (remainder >= 0){
    interval += 100;
    level++;
    remainder -= interval;
  }
  remainder += interval;
  return { 'level':level, 'exp': remainder };
};


Character.getAll = function(){
  return db('characters')
  .then(function(data){
    return data[0];
  });
};

Character.getCurrentLevel = function(char_id){
  return db.select('level')
  .from('characters')
  .where({'id': id})
  .limit(1);
};

