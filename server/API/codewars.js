'use strict';
let request = require('request');
let CW      = module.exports;

let cwUserStats = function (){
  console.log("trying to work in github queries:6")
  return function (cwUsername){
    let options = {
      'url': 'https://www.codewars.com/api/v1/users/' + cwUsername, 
      'headers': {'Authorization' : 'wUGraBxyPMPbRJAy82dr'
      },
    }
  return new Promise(function(resolve, reject){
      request.get(options, function(err, resp, body){
        if (err){
          reject(err);
          return;
        }
        resolve(body, resp);
      });
    });
  };
}


CW.getUserBlob = function(username){
  return (cwUserStats(username)());
}

let cwNextChallenge = function() {
  return function() {
    let challenge = 'anything-to-integer';
    let options = {
      'url': 'https://www.codewars.com/api/v1/code-challenges/' + challenge, 
      'headers': {'Authorization' : 'wUGraBxyPMPbRJAy82dr'
    },
  };
    return new Promise(function(resolve, reject){
      request.get(options, function(err, resp, body){
        if(err){
          reject(err);
          return;
        }
        resolve(body,resp);
      });
    });
  };
};

//invoke GetUserStats w/ arg for username
CW.GetUserStats = cwUserStats();

CW.GetNextChallenge = cwNextChallenge();