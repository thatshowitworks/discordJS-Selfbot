const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
exports.run = function(client, message, args) {
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: reload was used in ${message.guild.name}#${message.channel.name}`));
  if(message.channel.type == `dm`) return message.author.send(`📛${message.author} you can't use this command in DM's.`);
  if(!message.guild.iconURL) {
    let embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, client.user.displayAvatarURL)
    .setDescription(`**Server info:**\n**Channels:** ${message.guild.channels.size} (${message.guild.channels.filter(channel => channel.type === 'text').size} Text | ${message.guild.channels.filter(channel => channel.type === 'voice').size} Voice)\n**Default channel:** ${message.guild.defaultChannel}\n**Created at:** ${moment(message.guild.createdAt).format(`YYYY-MM-DD HH:mm:ss`)}\n**Security level:** ${message.guild.verificationLevel}\n**Total members:** ${message.guild.memberCount}\n**Server region:** ${message.guild.region}\n \n**Owner Info:**\n**Username:**${message.guild.owner.user.username}\n**Discriminator:** ${message.guild.owner.user.discriminator}\n**ID:** ${message.guild.owner.user.id}`)
    .addField(`Roles [${message.guild.roles.size}]:`, `\`${message.guild.roles.map(c=>c.name).join(", ")}\``)
    .setColor(`BLURPLE`)
    .setFooter(`${client.user.username} server info | ${moment().format(`YYYY-MM-DD HH:mm:ss`)}`)
    .setThumbnail(client.user.displayAvatarURL)
    message.edit({embed})
  }else {
    embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setDescription(`**Server info:**\n**Channels:** ${message.guild.channels.size} (${message.guild.channels.filter(channel => channel.type === 'text').size} Text | ${message.guild.channels.filter(channel => channel.type === 'voice').size} Voice)\n**Default channel:** ${message.guild.defaultChannel}\n**Created at:** ${moment(message.guild.createdAt).format(`YYYY-MM-DD HH:mm:ss`)}\n**Security level:** ${message.guild.verificationLevel}\n**Total members:** ${message.guild.memberCount}\n**Server region:** ${message.guild.region}\n \n**Owner Info:**\n**Username:**${message.guild.owner.user.username}\n**Discriminator:** ${message.guild.owner.user.discriminator}\n**ID:** ${message.guild.owner.user.id}`)
    .addField(`Roles [${message.guild.roles.size}]:`, `\`${message.guild.roles.map(c=>c.name).join(", ")}\``)
    .setColor(`BLURPLE`)
    .setFooter(`${client.user.username} server info | ${moment().format(`YYYY-MM-DD HH:mm:ss`)}`)
    .setThumbnail(message.guild.iconURL())
    message.edit({embed})
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'server',
  description: 'server info',
  usage: 'server'
};
