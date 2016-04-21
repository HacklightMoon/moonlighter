'use strict';
let request = require('request');

module.exports.firstTry = function(url){
  return new Promise(function(resolve, reject){
    let options = {
      url: 'https://api.github.com' + url,
      headers: {
        "User-Agent": 'Moonlight'
      }
    };

    request.get(options, function(err, resp, body){
      if(err){
        reject(err);
        return;
      }
      resolve(body, resp);
    });
  });
}


