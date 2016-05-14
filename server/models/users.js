'use strict';

let Promise   = require('bluebird');
let db        = require('../db');
let debug     = require('../debug');
let Users     = module.exports;
let API       = require('../API/githubQueries');
let Character = require('./characters.js');
let CW        = require('../API/codewars');

//verifyInsert: add new User to database OR retrieves existing one on sign-in, and returns that user's database row
Users.verifyInsert = function(blob){
  let user = db('users').where({ passid: blob.id  });
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

//Users.verifyId: user's github id => user's database row 
Users.verifyId = function(id){
  return db('users')
  .where({
    passid: id
  })
  .limit(1);
};

//Users.getByGithubUsername: user's github username => user's database row 
Users.getByGithubUsername = function(githubUsername){
  return db('users')
  .where({
    'github_username': githubUsername
  })
  .limit(1);
};

//Users.getById: user's primary key id => user's database row
Users.getById = function(id){
  return db('users')
  .where({
    'id': id
  }).limit(1);
};

//Users.getByLoggedIN: user's github data blob => user's database row
Users.getByLoggedIn = function(blob){
  let passid = JSON.parse(blob).id;
  return db('users')
  .where({
    'passid': passid
  })
  .limit(1)
  .then(function(user){
    return user;
  });
};

//Users.update: new database row for user => updated row for user
Users.update = function(obj){
  return db('users').where({
    passid: obj.id
  }).limit(1)
  .update(obj.form)  
  .then(function(data){
    return data;
  });
};

//Users.pay: user id, amount => user's database row including updated money
Users.pay = function(id, amount){
  return db('users')
  .where({'id': id})
  .increment('money', amount)
  .then(function(data){
    return data;
  });
};

//Users.newContribs: user's database row => the increase in user's contributions since last login
Users.newContribs = function(user){
  return API.userContribsTotal(user.github_username)
  .then(function(newTotal){
    let newContribs = newTotal - user.contributions;
    return newContribs;
  });
};

//Users.updateContribs: user's github username => user's database row, with updated contributions, experience, level, and unseen contributions

Users.updateContribs = function(githubUsername){
  return db('users')
  .where({'github_username': githubUsername})
  .then(function(users){
    let user = users[0];
    let contribs = API.userContribsTotal(githubUsername);
    let honor = CW.GetUserStats(user.codewars_username);
    let newContribs = Users.newContribs(user)
    return Promise.all([contribs, honor, newContribs]);
  })
  .then(function(values){
    let contribs = values[0];
    let honor = JSON.parse(values[1]).honor
    let newExp = Character.getExpFromContribs(values[0])
    + (Character.getExpFromHonor(honor || 0));
    let newLevel = Character.getLevelFromExp(newExp).level;
    let newContribs = values[2];
    return db('users')
    .where({'github_username': githubUsername})
    .returning('*')
    .update({
      'contributions': contribs, 
      'experience': newExp,
      'level': newLevel,
      'unseenContribs': newContribs
    });
  });
};
//Users.updateExp: user's github username => user's database row with updated experience
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

//Users.contribsSeen: user's id => user's database row, with unseen contributions (unseenContribs) set to 0
Users.contribsSeen = function(user_id){
  return db('users')
  .where({'id': user_id})
  .update({'unseenContribs': 0})
  .then(function(){
    return db('users')
    .where({'id': user_id})
  });
};

//Users.delete: user's id => remove user from database, return number of affected rows(1)
Users.delete = function(user_id){
  return db('users')
  .where({'id': user_id})
  .del();
}

//Users.linkCodewars: user's id, codewars_username, codewars_API_key => adds codewars_username, codewars_API_key and returns # of rows affected
Users.linkCodewars = function(userId, cwUsername, cwAPIKey){
  console.log('userId in linkCodewars', userId)
  return db('users')
  .where({'id': userId})
  .update({
    'codewars_username': cwUsername,
    'codewars_API_key': cwAPIKey
  })
  .catch(function(err){
    console.log('linkCodewars Error:', err);
  });
};
