'use strict';

let Promise = require('bluebird'); //remove this once babel is available.
let db = require('../db');
let Users = module.exports;
let API = require('../API/githubQueries');

Users.verifyInsert = function(obj){
  let session = {};
  session.passid = obj.id;
  session.profile_picture = obj._json.avatar_url;
  session.github_username = obj._json.login || username;
  session.full_name = obj._json.name || obj.displayName;
  session.email = obj.emails ? obj.emails[0].value : null;
  return db('users').where({
    passid: session.passid
  })
  .then(function(data){
    if (data.length === 0){
      return API.userContribsTotal(session.github_username)
      .then(function(contributions){
        session.contributions = contributions;
        return db('users').insert(session).limit(1)
      })
      .catch(function(err){
        console.log("Error:", err);
        return;
      });
    } 
    else {
      if (Array.isArray(data)){ 
        let user = data[0];
        return Users.newContribs(user)
        .then(function(newContribs){
          console.log("trying to insert newContribs", newContribs)
          return db('users')
          .where({'id': user.id})
          .increment('contributions', newContribs)
          .increment('unseenContribs', newContribs)
          .then(function(){
            return user;
          })
        })
      } 
      else { 
        console.log("User not array:", data);
        return data;
      } 
    }
  });
};

Users.verifyId = function(id){
  return db('users').where({
    passid: id
  })
  .limit(1);
};

Users.getByGithubUsername = function(githubUsername){
  return db('users')
  .where({
    'github_username': githubUsername
  })
  .limit(1);
};

Users.getById = function(id){
  return db('users')
  .where({
    'id': id
  }).limit(1);
};

Users.getByLoggedIn = function(blob){
  let passid = JSON.parse(blob).id;
  return db('users').where({
    'passid': passid
  }).limit(1).then(function(user){
    console.log("users.js getByLoggedIn, user:", user);
    return user;
  });
};

Users.update = function(obj){
  return db('users').where({
    passid: obj.id
  }).limit(1)
  .update(obj.form)  
  .then(function(data){
    return data;
  });
};

Users.pay = function(id, amount){
  return db('users')
  .where({'id': id})
  .increment('money', amount)
  .then(function(data){
    return data;
  });
};

//Need better algorithm than looking at all of last year's contributions, and only them.
Users.newContribs = function(user){
  console.log("Users.newContribs successfully called on", user.github_username);
  return API.userContribsTotal(user.github_username)
  .then(function(newTotal){
    let newContribs = newTotal - user.contributions;
    console.log("returning newContribs:", newContribs);
    return newContribs;
  });
};

Users.updateContribs = function(github_username){
  return API.userContribsTotal(github_username)
  .then(function(contribs){
    return db('users')
    .where({'github_username': github_username})
    .returning('contributions')
    .update({'contributions': contribs})
  });
};

Users.contribsSeen = function(user_id){
  return db('users')
  .where({'id': user_id})
  .update({'unseenContribs': 0})
  .then(function(){
    return db('users')
    .where({'id': user_id})
  });
};
