'use strict';

let Promise   = require('bluebird'); //remove this once babel is available.
let db        = require('../db');
let Users     = module.exports;
let API       = require('../API/githubQueries');
let Character = require('./characters.js');

Users.verifyInsert = function(blob){
  let user = db('users').where({ passid: blob.id });
  let contributions = API.userContribsTotal(blob._json.login);
  Promise.all([user, contributions])
  .then(function(values){
    let users = values[0];
    let contributions = values[1];
    if (users.length > 0){
      return Users.updateContribs(users[0].github_username);
    }
    else {
      let exp     = Character.getExpFromContribs(contributions);
      let level   = Character.getLevelFromExp(exp).level;
      let newUser = {
        'passid'          : blob.id,
        'profile_picture' : blob._json.avatar_url,
        'github_username' : blob._json.login || username,
        'full_name'       : blob._json.name || blob.displayName,
        'email'           : blob.emails ? blob.emails[0].value : null,
        'contributions'   : contributions,
        'experience'      : exp,
        'level'           : level
      };
      return db('users').insert(newUser).limit(1);
    }
  })
  .catch(function(err){
    console.log("Users.verifyInsert Error:", err);
    return;
  });
};

Users.verifyId = function(id){
  return db('users')
  .where({
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
    console.log("users.js getByLoggedIn was called.");
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
    let newExp = Character.getExpFromContribs(contribs);
    let newLevel = Character.getLevelFromExp(newExp).level;
    return db('users')
    .where({'github_username': github_username })
    .limit(1)
    .then(function(user){
      return Users.newContribs(user[0]);
    })
    .then(function(newContribs){
      console.log("users.js, newContribs:", newContribs);
      return db('users')
      .where({'github_username': github_username })
      .returning('*')
      .update({
        'contributions': contribs, 
        'experience': newExp,
        'level': newLevel,
        'unseenContribs': newContribs
      });
    });
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
