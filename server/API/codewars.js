'use strict';
let request = require('request');
let CW      = module.exports;

let getCodeWar = function (){
  console.log("trying to work in github queries!!!")
  return function (codewarsUsername){
    let options = {
      'url': 'https://www.codewars.com/api/v1/users/' + codewarsUsername, 
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
CW.getMatCode = getCodeWar('') 
// fill me in 
// todo
CW.getUserBlob = function(username){
  return (getCodeWar(username)());
}
