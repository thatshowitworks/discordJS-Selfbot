const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
exports.run = function(client, message, args) {
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: yesorno was used in ${message.guild.name}#${message.channel.name}`));
    message.delete()
    message.channel.send(`Generating answer...`).then(mes => {
    snekfetch.get("https://yesno.wtf/api/").then(r => {
      let embed = new Discord.RichEmbed()
      .setImage(`${r.body.image}`)
      .setColor(`BLURPLE`)
      .setTitle(`${r.body.answer}`)
      .setFooter(`Selfbot by ${config.devtag}`)
      mes.edit({embed})
    }).catch(console.error);
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: 'yesorno',
  description: 'Random awnser!',
  usage: 'yesorno'
};
