'use strict';
let request = require('request');
let CW      = module.exports;
let PID;
let SID;
let DMID;

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
let strategy = 'kyu_5_workout';
//GetNextChallenge: WHAT IS THE INPUT? => WHAT IS THE OUTPUT?

CW.GetChallenge = function() {
  // let challenge = 'anything-to-integer';
  let options = {
    'url': 'https://www.codewars.com/api/v1/code-challenges/javascript/train',
    'headers': {'Authorization' : 'wUGraBxyPMPbRJAy82dr'},
    'data': {'strategy': 'random'}
  };
  return new Promise(function(resolve, reject){
    request.post(options, function(err, resp, body){
      if(err){
        reject(err);
        return;
      }
      // console.log('CW projectID cw.js:36',JSON.parse(body))
      // console.log('CW projectID cw.js:36',JSON.parse(body).session.projectId, JSON.parse(body).session.projectId);
      PID = JSON.parse(body).session.projectId;
      SID = JSON.parse(body).session.solutionId;
      resolve(body,resp);
    });
  });
};

// var challengeData = CW.GetChallenge();


CW.testSolution = function(code) {
  console.log('PID:', PID);
  let options = {
    'url': 'https://www.codewars.com/api/v1/code-challenges/projects/' + PID + '/solutions/' + SID + '/attempt?code=' + code,
    'headers': {'Authorization' : 'wUGraBxyPMPbRJAy82dr'},
    //'data': code
  };
  return new Promise(function(resolve, reject){
    request.post(options, function(err, resp, body){
      if(err){
        reject(err);
        return;
      }
      DMID = JSON.parse(body).dmid;
      resolve(body,resp);
    });
  });
}

CW.getDeferred = function() {
  let options = {
    'url': 'https://www.codewars.com/api/v1/deferred/' + DMID,
    'headers': {'Authorization' : 'wUGraBxyPMPbRJAy82dr'}
  }
  return new Promise(function(resolve, reject){
    request.get(options, function(err, resp, body){
      if(err){
        reject(err);
        return;
      }
      resolve(body,resp);
    });
  });
}

CW.finalSolution = function(){
  let options = {
    'url': 'https://www.codewars.com/api/v1/code-challenges/projects/' + PID + '/solutions/' + SID + '/finalize',
    'headers': {'Authorization' : 'wUGraBxyPMPbRJAy82dr'}
  }
  return new Promise(function(resolve, reject){
    request.post(options, function(err, resp, body){
      if(err){
        reject(err);
        return;
      }
      resolve(body,resp);
    });
  });
}


