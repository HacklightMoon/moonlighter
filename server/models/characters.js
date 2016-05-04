'use strict';

let db = require('../db');
let Character = module.exports;
let Promise = require('bluebird');

Character.getAll = function(){
  return db('characters')
  .then(function(data){
    return data
  });
}
