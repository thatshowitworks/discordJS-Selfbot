const Discord = require('discord.js');
const chalk = require('chalk');
const moment = require('moment');
const fs = require('fs');
const os = require('os');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
exports.run = function(client, message, args) {
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: stats was used in ${message.guild.name}#${message.channel.name}`));
  let embed = new Discord.RichEmbed()
  .setAuthor(`${client.user.tag} Status`, client.user.displayAvatarURL)
  .setColor(`BLURPLE`)
  .setFooter(`Selfbot by ${config.devtag}`, client.user.displayAvatarURL)
  .setDescription(`**MEM usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB /${os.freemem().toFixed(2)} KB\n**Uptime since last restart:** ${moment(client.uptime).format(`HH [Hour(s)] | mm [Minute(s)]`)}\n**OS version:** ${os.platform()}(${os.release()})\n**Total users:** ${client.users.size.toLocaleString()}\n**Total channels:** ${client.channels.size.toLocaleString()}(${client.channels.filter(channel => channel.type === 'text').size} Text | ${client.channels.filter(channel => channel.type === 'voice').size} Voice)\n**Total guilds:** ${client.guilds.size.toLocaleString()}\n**Discord.JS** Version: ${Discord.version}\n**NodeJS/NPM version:** ${process.version}`)
  message.edit({embed})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'stats',
  description: 'Selfbot statistics.',
  usage: 'stats'
};
