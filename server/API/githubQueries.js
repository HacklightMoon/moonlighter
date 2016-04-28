'use strict';
let request = require('request');
let API = module.exports;

let getReqFunc = function(url){
  return function(){
    let options = {
      'url': 'https://api.github.com' + url,
      'headers':{'User-Agent': 'Moonlight'}
    };
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
};

API.getCurrentUser = getReqFunc('/user');

API.notifications = getReqFunc('/search/issues?q=is%3Aopen+is%3Aissue+mentions%3Amoonlighter-bot');
