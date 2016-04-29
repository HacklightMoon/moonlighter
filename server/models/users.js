'use strict';

let Promise = require('bluebird'); //remove this once babel is available.
let db = require('../db');
let Users = module.exports;
let API = require('../API/githubQueries')

Users.verifyInsert = function(obj, token){
  let session = {};
  session.passid = obj.id;
  session.token = 'token ' + token;
  session.profile_picture = obj._json.avatar_url;
  session.github_username = obj._json.login || username;
  session.full_name = obj._json.name || obj.displayName;
  session.email = obj.email;

  return db('users').where({
    passid: session.passid
  }).then(function(data){
    if (data.length === 0){
      return db('users').insert(session).limit(1).then(function(array){
        return array[0];
      });
    } else {
      if (Array.isArray(data)){
        return data[0];
      } else {
        return data;
      }
    }
  });
};

Users.verifyId = function(id){
  return db('users').where({
    passid: id
  }).limit(1);
};

Users.getById = function(id){
  return db('users').where({
    'id': id
  }).limit(1);
};

Users.getByLoggedIn = function(blob){
    console.log("AAAAAAAAAAAAAAAAAusers.js, blob", blob);
    let passid = JSON.parse(blob).id;
    return db('users').where({
      'passid': passid
    }).limit(1);
  };


//obj should look like: { id: id, form: form } 
//obj.form can only contain keys that match columns in the user schema.
Users.update = function(obj){
  return db('users').where({
    passid: obj.id
  }).limit(1)
  .update(obj.form)  
  .then(function(data){
    return data;
  });
};
