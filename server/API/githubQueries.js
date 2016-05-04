'use strict';
let request = require('request');
let API = module.exports;

let getReqFunc = function(url){
  return function(token){
    let options = {
      'url': 'https://api.github.com' + url,
      'headers':{'User-Agent': 'Moonlight',
        'Authorization': token
      },
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

// This is a search query for only open issues:
// API.notifications = getReqFunc('/search/issues?q=is%3Aopen+is%3Aissue+mentions%3Amoonlighter-bot');

// This is a search query for ALL issues:
API.notifications = getReqFunc('/search/issues?q=is%3Aissue+mentions%3Amoonlighter-bot');

API.userContribsTotal = function(username){
  console.log("userContribsTotal begun with username:", username);
  let options = {
    'url': 'https://github.com/' + username
  }
  return new Promise(function(resolve, reject){
    request.get(options, function(err, resp, body){
      if (err){
        console.log("Error:", err);
        reject(err);
        return;
      }
        resolve(body);
    })
  })
  .then(function(html){
    let yearlyContribs = Number(html.split('class="contrib-number">')[1].split(' total')[0]);
    return yearlyContribs;
  })
  .catch(function(error){
    console.log("Error:", error);

  })
};
