const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
exports.run = function(client, message, args) {
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: quote was used in ${message.guild.name}#${message.channel.name}`));
  const id = message.content.split(' ')[1];
  const text = message.content.split(' ').slice(2).join(' ');
  if(!id) return message.channel.send(`No message specified`);
  message.channel.fetchMessages({around:id,limit:1}).then(msg => {
  const thatMsg = msg.first();
  const Time = moment(thatMsg.createdAt).fromNow()
  let embed = new Discord.RichEmbed()
  .setColor(`BLURPLE`)
  .setAuthor(thatMsg.author.tag, thatMsg.author.displayAvatarURL)
  .setDescription(thatMsg.content)
  .setFooter(`Around ${Time} | In #${thatMsg.channel.name} `, `https://cdn.discordapp.com/emojis/317208176703569920.png`);
  message.edit(text,{embed})
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'quote',
  description: 'quote a message.',
  usage: 'quote [messageID] [reaction]'
};
