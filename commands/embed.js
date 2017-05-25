const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
const chalk = require('chalk');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
exports.run = function(client, message, args) {
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: embed was used in ${message.guild.name}#${message.channel.name}`));
  message.delete()
  const content = message.content.split(' ').slice(1).join(' ');
  let msg = new Discord.RichEmbed()
  msg.setAuthor(client.user.tag, client.user.displayAvatarURL)
  msg.setColor(`BLURPLE`)
  msg.setFooter(`Selfbot by ${config.devtag}| ${moment().format('MMMM Do YYYY | h:mm:ss a')}`, `https://cdn.discordapp.com/emojis/317193788827238411.png`)
  msg.setDescription(`${content}`)
  message.channel.send({embed : msg})
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'embed',
  description: 'embed anything!',
  usage: 'embed [content]'
};
