'use strict';
const R = require('ramda');
const request = require('request');
const API = module.exports;

const pAjax = function(options){
  return new Promise(function(resolve, reject){
    request.get(options, function(err, resp, body){
      if (err){
        reject(err);
        return;
      }
      resolve(body, resp);
    });
  });
}

const githubRequest = R.curry(function(url, token){
  return pAjax({
    'url': 'https://api.github.com' + url,
    'headers':{
      'User-Agent': 'Moonlight',
      'Authorization': token
    }
  })
});

API.getCurrentUser = githubRequest('/user');
API.notifications = githubRequest('/search/issues?q=is%3Aissue+mentions%3Amoonlighter-bot');

API.userContribsTotal = function(username){
  console.log("userContribsTotal begun with username:", username);
  const options = {
    'url': 'https://github.com/' + username
  }
  return pAjax(options)
  .then(function(html){
    const contRegex = /([0-9]+) contributions in the last year/
    const yearlyContribs = html.match(contRegex)[1];
    return yearlyContribs;
  })
  .catch(function(error){
    console.log("Error:", error);
  })
};
