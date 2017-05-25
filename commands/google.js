const google = require('google');
google.resultsPerPage = 1
var nextCounter = 0
const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
exports.run = function(client, message, args) {
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: google was used in ${message.guild.name}#${message.channel.name}`));
  const search = message.content.split(' ').slice(1).join('_');
  const search2 = message.content.split(' ').slice(1).join(' ');
  if(!search) return message.edit(`No search term specified.`);
  let embed = new Discord.RichEmbed()
  .setAuthor(`Google search`, `https://cdn.discordapp.com/emojis/317193877088108554.png`)
  .setDescription(`[:arrows_counterclockwise: Searching for: **${search2}**](https://github.com/wesselgame/discordJS-Selfbot)`)
  .setFooter(`Selfbot by ${config.devtag} | ${moment().format('MMMM Do YYYY | h:mm:ss a')}`, `https://cdn.discordapp.com/emojis/317193788827238411.png`)
  .setColor(0x00ff00)
  embed1 = new Discord.RichEmbed()
 .setAuthor(`Google search`, `https://cdn.discordapp.com/emojis/317193877088108554.png`)
 .setDescription(`[:negative_squared_cross_mark: Term: **${search2}** not found](https://github.com/wesselgame/discordJS-Selfbot)`)
 .setFooter(`${moment().format(`YYYY-MM-DD HH:mm:ss`)}`, `https://cdn.discordapp.com/emojis/317193788827238411.png`)
 .setColor(0xffa500)
  message.edit({embed})
  google(search, function (err, res){
    if (err) {
      error = new Discord.RichEmbed()
      .setAuthor(`Google search`, `https://cdn.discordapp.com/emojis/317193877088108554.png`)
      .setDescription(`[:name_badge:  An error occured: \`${err}\`](https://github.com/wesselgame/discordJS-Selfbot)`)
      .setFooter(`${moment().format(`YYYY-MM-DD HH:mm:ss`)}`, `https://cdn.discordapp.com/emojis/317193788827238411.png`)
      .setColor(0xff0000)
      message.channel.send({embed : error})
    }
    if(!res.links.length) return message.edit({embed : embed1})
    for (var i = 0; i < res.links.length; ++i) {
      var link = res.links[i];
       embed2 = new Discord.RichEmbed()
      .setAuthor(`Google search`, `https://cdn.discordapp.com/emojis/317193877088108554.png`)
      .setDescription(`[:white_check_mark: search found:](https://github.com/wesselgame/discordJS-Selfbot) **[${link.title}](${link.href})**\n \n[${link.description}](https://github.com/wesselgame/discordJS-Selfbot)`)
      .setFooter(`${moment().format(`YYYY-MM-DD HH:mm:ss`)}`, `https://cdn.discordapp.com/emojis/317193788827238411.png`)
      .setColor(0x00ff00)
      message.edit({embed : embed2})
    }
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'google',
  description: 'Google on the web!',
  usage: 'google [searchterm]'
};
