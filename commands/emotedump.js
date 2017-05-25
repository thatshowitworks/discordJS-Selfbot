const Discord = require('discord.js');
const fs = require('fs');
const chalk  = require('chalk');
const moment = require('moment');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
exports.run = function(client, message, args) {
  if(message.channel.type == `dm`) return message.channel.send(`📛${message.author} you can't use this command in DM's.`);
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: emotedump was used in ${message.guild.name}#${message.channel.name}`));
  let serv = message.guild;
  if(!serv.emojis) return message.channel.send(`📛${message.author} No emotes found.`)
  let dump = new Discord.RichEmbed()
  dump.setAuthor(`Emote dump`, client.user.displayAvatarURL)
  dump.setDescription(`[Dumping all Guild emotes.](https://github.com/wesselgame/discordJS-Selfbot)`)
  dump.setFooter(`Selfbot by ${config.devtag}`, client.user.displayAvatarURL)
  success = new Discord.RichEmbed()
  success.setAuthor(`Emote dump`, client.user.displayAvatarURL)
  success.setDescription(`[Emote-dump success!](https://github.com/wesselgame/discordJS-Selfbot)`)
  success.setFooter(`Selfbot by ${config.devtag}`, client.user.displayAvatarURL)
if(message.content.includes(` -l`)) {
  message.channel.send({embed : dump}).then(mes => {
  fs.writeFile(`emote.dump`, serv.emojis.map(c=>`${c.url}`).join('\n '), (err, callback) => {
    if(err) {
      console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`An error occured [${err.code}]:\n${err.stack}`));
      error = new Discord.RichEmbed()
      error.setAuthor(`Command Reloader`, client.user.displayAvatarURL)
      error.setDescription(`[Error while dumping emotes [${err.code}]:\n\`${err}\`.](https://github.com/wesselgame/discordJS-Selfbot)`)
      error.setFooter(`Selfbot by ${config.devtag}`, client.user.displayAvatarURL)
     }
     setTimeout(() => {
       mes.delete()
       mes.channel.send({embed : success, files: [{attachment: `./emote.dump`, name: 'DUMP.txt'}]})
     }, 1000)
   });
  });
}else {
  message.channel.send({embed : dump}).then(mes => {
    fs.writeFile(`emote.dump`, serv.emojis.map(c=>`${c.name}(${c.id}) {${c.url}}`).join('\n '), (err, callback) => {
      if(err) {
        console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`An error occured [${err.code}]:\n${err.stack}`));
        error = new Discord.RichEmbed()
        error.setAuthor(`Command Reloader`, client.user.displayAvatarURL)
        error.setDescription(`[Error while dumping emotes [${err.code}]:\n\`${err}\`.](https://github.com/wesselgame/discordJS-Selfbot)`)
        error.setFooter(`Selfbot by ${config.devtag}`, client.user.displayAvatarURL)
      }
      setTimeout(() => {
        mes.delete()
       mes.channel.send({embed : success, files: [{attachment: `./emote.dump`, name: 'DUMP.txt'}]})
      }, 1000)
    });
  })
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'emotedump',
  description: 'Dumps all emotes from the guild where you use it in.',
  usage: 'emotedump [-l(OPTIONAL)]'
};
