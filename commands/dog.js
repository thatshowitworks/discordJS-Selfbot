const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
exports.run = function(client, message, args) {
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: dog was used in ${message.guild.name}#${message.channel.name}`));
  message.delete()
  message.channel.send(`Generating dog...`).then(mes => {
  snekfetch.get("http://random.dog/woof.json").then(r => {
    let embed = new Discord.RichEmbed()
    .setImage(`${r.body.url}`)
    .setColor(`BLURPLE`)
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
  name: 'dog',
  description: 'Random dogs!',
  usage: 'dog'
};
