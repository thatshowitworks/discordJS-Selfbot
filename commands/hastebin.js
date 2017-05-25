const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const snekfetch = require('snekfetch');
const fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
exports.run = function(client, message, args) {
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: hastebin was used in ${message.guild.name}#${message.channel.name}`));
  const search = message.content.split(' ').slice(1).join(' ');
  let load = new Discord.RichEmbed()
  .setAuthor(`Hastebin`, `https://cdn.discordapp.com/attachments/305695257377374208/313803821547651072/haste.png`)
  .setDescription(`[:arrows_counterclockwise: Uploading](https://github.com/wesselgame/discordJS-Selfbot)`)
  .setFooter(`Selfbot by ${config.devtag} | ${moment().format('MMMM Do YYYY | h:mm:ss a')}`, `https://cdn.discordapp.com/emojis/317193788827238411.png`)
  .setColor(0x00ff00)
  message.edit({embed : load}).then(mes => {
    snekfetch.post('https://hastebin.com/documents').send(`${search}\n\n-Posted Using ${config.devtag}'s Discord.JS selfbot (https://github.com/wesselgame/discordJS-Selfbot)`).then(function(res, err) {
      if(err) {
        error = new Discord.RichEmbed()
        .setAuthor(`Hastebin`, `https://cdn.discordapp.com/emojis/311824300166479872.png`)
        .setDescription(`[:name_badge:  An error occured:](https://github.com/wesselgame/discordJS-Selfbot) \`${err}\``)
        .setFooter(`Selfbot by ${config.devtag} | ${moment().format('MMMM Do YYYY | h:mm:ss a')}`, `https://cdn.discordapp.com/emojis/317193788827238411.png`)
        .setColor(0xff0000)
        message.channel.send({embed: error})
      }
      embed = new Discord.RichEmbed()
     .setAuthor(`Hastebin`, `https://cdn.discordapp.com/attachments/305695257377374208/313803821547651072/haste.png`)
     .setDescription(`[✅Uploaded:](https://github.com/wesselgame/discordJS-Selfbot) https://hastebin.com/${res.body.key}.ban`)
     .setFooter(`Selfbot by ${config.devtag} | ${moment().format('MMMM Do YYYY | h:mm:ss a')}`, `https://cdn.discordapp.com/emojis/317193788827238411.png`)
     mes.edit({embed})
    });
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'hastebin',
  description: 'hastebin anything!',
  usage: 'hastebin [content]'
};
