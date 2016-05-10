'use strict';

let Promise   = require('bluebird');
let db        = require('../db');
let debug     = require('../debug');
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

let loggedInCount = debug.countLog("Users.getByLoggedIn called");
Users.getByLoggedIn = function(blob){
  loggedInCount();
  let passid = JSON.parse(blob).id;
  return db('users').where({
    'passid': passid
  }).limit(1).then(function(user){
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

let newContribsCount = debug.countLog("Users.newContribs called");
Users.newContribs = function(user){
  newContribsCount();
  return API.userContribsTotal(user.github_username)
  .then(function(newTotal){
    let newContribs = newTotal - user.contributions;
    return newContribs;
  });
};

Users.updateContribs = function(githubUsername){
  return API.userContribsTotal(githubUsername)
  .then(function(contribs){
    let newExp = Character.getExpFromContribs(contribs);
    let newLevel = Character.getLevelFromExp(newExp).level;
    return db('users')
    .where({'github_username': githubUsername })
    .limit(1)
    .then(function(user){
      return Users.newContribs(user[0]);
    })
    .then(function(newContribs){
      return db('users')
      .where({'github_username': githubUsername })
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

Users.updateExp = function(githubUsername){
  return db('users')
  .where({'github_username': githubUsername})
  .then(function(users){
    let user = users[0];
    let newExp = Character.getExpFromContribs(user.contributions) + Character.getExpFromHonor(user.honor)
    return db('users')
    .returning('*')
    .where({
      'id': user.id,
      'experience': newExp
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

Users.delete = function(user_id){
  return db('users')
  .where({'id': user_id})
  .del();
}
