'use strict';

module.exports.countLog = function(string){
  let counter = 1;
  return function(){
    console.log(string + ' #' + counter)
    counter++;
  }
};
