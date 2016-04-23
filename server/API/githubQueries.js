'use strict';
let request = require('request');

module.exports.firstTry = function(url){
  let headers = require('../auth/github.js').headers || {'User-Agent': 'Moonlight'};
  return new Promise(function(resolve, reject){
    let options = {
      'url': 'https://api.github.com' + url,
      'headers': headers
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

module.exports.notifications = function(){
  let headers = require('../auth/github.js').headers;
  return new Promise(function(resolve, reject){
    let options = {
      'url': 'https://api.github.com/search/issues?q=is%3Aopen+is%3Aissue+mentions%3Amoonlighter-bot',
      'headers': headers
    };

    request.get(options, function(err, resp, body){
      if(err){
        reject(err);
        return;
      }
      resolve(body, resp);
    });
  })
}
