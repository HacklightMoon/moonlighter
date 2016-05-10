'use strict';
let request = require('request');
let CW      = module.exports;

//GetUserStats: user's codewars_username => response object from github API
CW.GetUserStats = function (cwUsername){
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

//GetNextChallenge: WHAT IS THE INPUT? => WHAT IS THE OUTPUT?
CW.GetNextChallenge = function() {
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
