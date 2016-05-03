'use strict';

let BOT = module.exports;
BOT.headers = { "User-Agent": "Moonlighter", "Authorization": process.env.BOT_KEY };

let parseCommand = function(commandString){
  let commands = commandString.split(' ');
  let start = commands.indexOf('@moonlighter-bot');
  let commands = 

}

let commands = ['embark', 'reward'];
