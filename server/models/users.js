'use strict';

let Promise = require('bluebird'); //remove this once babel is available.
let db = require('../db');
let Users = module.exports;

Users.verifyInsert = function(obj){
  let session = {};
  session.passid = obj.id;

  //obj.provider === 'github'
  session.profile_picture = obj._json.avator_url;
  session.user = obj._json.name || obj.username;

  return db('users').where({
    passid: session.passid
  }).then(function(data){
    if (data.length === 0){
      return db('users').insert({
        user: session.user,
        passid: session.passid,
        profile_picture: session.profile_picture
      }).limit(1).then(function(array){
        console.log('returning sessions (models/users.js, 24)');
        return session;
      });
    } else {
      console.log('models/users.js, 28 datas = ', data)
      if (Array.isArray(data)){
        return data[0];
      } else {
        return data;
      }
    }
  })
};

Users.verifyId = function(id){
  return db('users').where({
    passid: id
  }).limit(1);
};
