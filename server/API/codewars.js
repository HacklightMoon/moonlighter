
'use strict';
let request = require('request');
let CW      = module.exports;
let PID;
let SID;
let DMID;

// GetUserStats: user's codewars_username => response object from github API
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

// get a codewars challenge from passed in challengeType
CW.GetChallenge = function(challengeType) {
  let options = {
    'url': 'https://www.codewars.com/api/v1/code-challenges/javascript/train?strategy='+challengeType,
    'headers': {'Authorization' : 'wUGraBxyPMPbRJAy82dr'},
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

// posts code to codewars server to test

CW.testSolution = function(code) {
  console.log('PID: & SID: ', PID, SID);
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
  console.log("this is your DMID: ", DMID)
  return new Promise(function(resolve, reject){
    request.get(options, function(err, resp, body){
      if(err){
        reject(err);
        return;
      }
      console.log("getDeferred resp.value:", JSON.parse(body).value)
      if (JSON.parse(body).value === "running" || JSON.parse(body).value === "queued"){
        setTimeout(function(){return CW.getDeferred()}, 1000);
      }
      else {
        console.log("here's your summary, baybee", JSON.parse(body).summary);
        resolve(body,resp);
      }
    });
  })

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
      console.log("response from finalSolution: ", body)
      resolve(body,resp);
    });
  });
}
