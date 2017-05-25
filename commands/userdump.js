const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
const chalk = require('chalk');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
exports.run = function(client, message, args) {
  if(message.channel.type == 'dm') return;
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: userdump was used in ${message.guild.name}#${message.channel.name}`));
  let dump = new Discord.RichEmbed()
  dump.setAuthor(`User dump`, client.user.displayAvatarURL)
  dump.setDescription(`[Dumping all Guild users.](https://github.com/wesselgame/discordJS-Selfbot)`)
  dump.setFooter(`Selfbot by ${config.devtag}`, client.user.displayAvatarURL)
  success = new Discord.RichEmbed()
  success.setAuthor(`User dump`, client.user.displayAvatarURL)
  success.setDescription(`[User-dump success!](https://github.com/wesselgame/discordJS-Selfbot)`)
  success.setFooter(`Selfbot by ${config.devtag}`, client.user.displayAvatarURL)
  message.edit({embed : dump}).then(mes => {
    fs.writeFile(`user.dump`, message.guild.members.map(m=>`${m.user.tag}(${m.user.id}) [${moment(m.user.createdAt).format('MMMM Do YYYY h:mm:ss')}]{${m.user.displayAvatarURL.replace('.webp', '.png')}}`)/*.short()*/.join('\n '), (err, callback) => {
      if(err) {
        console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`An error occured [${err.code}]:\n${err.stack}`));
        error = new Discord.RichEmbed()
        error.setAuthor(`Command Reloader`, client.user.displayAvatarURL)
        error.setDescription(`[Error while dumping users [${err.code}]:\n\`${err}\`.](https://github.com/wesselgame/discordJS-Selfbot)`)
        error.setFooter(`Selfbot by ${config.devtag}`, client.user.displayAvatarURL)
       }
    });
    setTimeout(() => {
      mes.delete()
  message.channel.send({embed : success, files: [{attachment: `./user.dump`, name: 'DUMP.txt'}]})
    }, 1000)
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'userdump',
  description: 'Dumps all user data from the guild where you use it in. (USERNAME#DISCRIM(USERID)[CREATEDDATE]{AVATARURL})',
  usage: 'userdump'
};
