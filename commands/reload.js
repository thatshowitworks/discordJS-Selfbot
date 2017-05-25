const Discord = require('discord.js');
const chalk = require('chalk');
const moment = require('moment');
exports.run = (client, message, args) => {
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: reload was used in ${message.guild.name}#${message.channel.name}`));
  let command;
  let notfound = new Discord.RichEmbed()
  notfound.setAuthor(`Command Reloader`, client.user.displayAvatarURL)
  notfound.setDescription(`[Error while reloading: **${command}**:\nModule not found.](https://github.com/wesselgame/discordJS-Selfbot)`)
  notfound.setFooter(`Selfbot by ${config.devtag}`, client.user.displayAvatarURL)
  reload = new Discord.RichEmbed()
  reload.setAuthor(`Command Reloader`, client.user.displayAvatarURL)
  reload.setDescription(`[Reloading: **${command}**.](https://github.com/wesselgame/discordJS-Selfbot)`)
  reload.setFooter(`Selfbot by ${config.devtag}`, client.user.displayAvatarURL)
  success = new Discord.RichEmbed()
  success.setAuthor(`Command Reloader`, client.user.displayAvatarURL)
  success.setDescription(`[Command: **${command}** Successfully reloaded.](https://github.com/wesselgame/discordJS-Selfbot)`)
  success.setFooter(`Selfbot by ${config.devtag}`, client.user.displayAvatarURL)
  message.channel.send(`Loading...`).then(mes => {
    if (client.commands.has(args[0])) {
      command = args[0];
    } else if (client.aliases.has(args[0])) {
      command = client.aliases.get(args[0]);
    }
    if (!command) {
       return mes.edit({embed : notfound});
    } else {
      mes.edit({embed : reload})
      .then(m => {
        client.reload(command)
      .then(() => {
        m.edit({embed : success});
        })
        .catch(e => {
          console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`An error occured [${err.code}]:\n${err.stack}`));
          error = new Discord.RichEmbed()
          error.setAuthor(`Command Reloader`, client.user.displayAvatarURL)
          error.setDescription(`[Error while reloading: **${command}** [${e.code}]:\n\`${e}\`.](https://github.com/wesselgame/discordJS-Selfbot)`)
          error.setFooter(`Selfbot by ${config.devtag}`, client.user.displayAvatarURL)
          m.edit({embed : error});
        });
      });
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 4
};

exports.help = {
  name: 'reload',
  description: 'Reloads the command file, if it has been updated or modified.',
  usage: 'reload [command]'
};
