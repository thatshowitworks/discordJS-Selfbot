const chalk = require('chalk');
const moment = require('moment');
exports.run = function(client, message, args) {
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: ping was used in ${message.guild.name}#${message.channel.name}`));
  message.channel.send(`Pinging.`).then(sent => {
    sent.edit(`Current ping: **${sent.createdTimestamp - message.createdTimestamp.toFixed()}** MS (API latency: **${client.ping.toFixed()}** MS)`)
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Check your client\'s Ping',
  usage: 'ping'
};
