/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//AUTHOR: Wessel Tip(- ̗̀Wesselgame ̖́-#0498)                                                                                  //
//PROJECT NAME: Selfbot                                                                                                    //
//PROJECT VERSION: 1.0.0                                                                                                   //
//PROJECT CREATED: 21-5-2017(21th of may 2017)                                                                             //
//LANGAUGE | LIBRARY:JavaScript | Discord.JS                                                                               //
//ALL NPM MODULES: Discord.js | moment | fs | child_process | snekfetch | util | os | google                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const chalk = require('chalk');
const fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
require('./util/eventLoader')(client);
client.login(config.token);
const log = message => {console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`${message}`))};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if(err) log(`An error occured [${err.code}]:\n${err.stack}`);
  log(`Loading commands [${files.length}]:`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading command: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name)
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if(cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  let permlvl = 0;
  return permlvl;
};
//Remove the `/*` & `*/` if you want to enable dubugging
/* client.on('debug', debug => {
   log(debug)
 });*/
