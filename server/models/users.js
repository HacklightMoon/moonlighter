'use strict';

let Promise = require('bluebird'); //remove this once babel is available.
let db = require('../db');
let Users = module.exports;
let API = require('../API/githubQueries')

Users.verifyInsert = function(obj, token){
  //  console.log('users.js 8, token:', token);
  //console.log('users.js 9, obj:', obj);
  let session = {};
  session.passid = obj.id;
  console.log('users.js 12, session.passid', session.passid);
  session.token = 'token ' + token;
  session.profile_picture = obj._json.avatar_url;
  session.github_username = obj._json.login || username;
  session.full_name = obj._json.name || obj.displayName;
  session.email = obj.email;

  return db('users').where({
    passid: session.passid
  }).then(function(data){
    console.log('users.js 21, data:', data);
    if (data.length === 0){
      return db('users').insert(session).limit(1).then(function(array){
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

Users.getByLoggedIn = function(){
  return API.getCurrentUser()
  .then(function(blob){
    let passid = JSON.parse(blob).id;
    console.log("users.js 56, passid:", passid)
    return db('users').where({
      'passid': passid
    }).limit(1);
  });
}

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
