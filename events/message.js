const fs = require('fs');
const Discord = require('discord.js');
let conf = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
module.exports = message => {
  let client = message.client;
  if (!message.content.startsWith(conf.prefix)) return;
  if(message.author.id !== client.user.id) return;
  let command = message.content.split(' ')[0].slice(conf.prefix.length);
  let args = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, args);
  }
};
//When a command has been executed
