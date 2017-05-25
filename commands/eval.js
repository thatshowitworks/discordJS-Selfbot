const Discord = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
exports.run = function(client, message, args) {
  console.log(chalk.green(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] - {${__filename}}:`), chalk.yellow(`Command: eval was used in ${message.guild.name}#${message.channel.name}`));
  function clean(text) {
    if (typeof(text) === 'string')
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    else
    return text;
  }
  let arg = message.content.split(' ').slice(1);
  let cont = message.content.split(' ').slice(1).join(' ');
  message.edit('Evaluating...').then(msg => {
    try {
      let code = arg.join(' ');
      let evaled = eval(code);

      if (typeof evaled !== 'string')
      evaled = require('util').inspect(evaled);
      if(evaled.length > 2000) {
        try {
          let evalcode1 = new Discord.RichEmbed()
          .setAuthor(`Eval by ${config.devtag}`, `https://cdn.discordapp.com/emojis/314405560701419520.png`)
          .setDescription(`**Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
          .addField(`\u200b`, `**Output:**\n\n\`\`\`Output too long, logged to ${__dirname}\\eval.txt\`\`\``, true)
          .setColor(0x00FF00)
          .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`, `https://images-ext-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Euc2FmZS5tb2UvVUJFVWwucG5nIn0.LbWCXwiUul3udoS7s20IJYW8xus`)
          msg.edit({embed : evalcode1});
          return fs.writeFile(`eval.txt`, `${clean(evaled)}`)
        } catch(err) {
          errorcode1 = new Discord.RichEmbed()
          .setAuthor(`Eval by ${config.devtag}`, `https://cdn.discordapp.com/emojis/314405560701419520.png`)
          .setDescription(`**Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
          .addField(`\u200b`, `**Output:**\n\n\`\`\`js\nOutput too long, logged to ${__dirname}\\eval.txt\`\`\``, true)
          .setColor(0xFF0000)
          .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`, `https://images-ext-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Euc2FmZS5tb2UvVUJFVWwucG5nIn0.LbWCXwiUul3udoS7s20IJYW8xus`)
          msg.edit({embed : errorcode1});
          return fs.writeFile(`eval.txt`, `${clean(err)}`)
        }
      }
      evalcode = new Discord.RichEmbed()
      .setAuthor(`Eval by ${config.devtag}`, `https://cdn.discordapp.com/emojis/314405560701419520.png`)
      .setDescription(`**Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
      .addField(`\u200b`, `**Output:**\n\n\`\`\`js\n${clean(evaled)}\`\`\``, true)
      .setColor(0x00FF00)
      .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`, `https://images-ext-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Euc2FmZS5tb2UvVUJFVWwucG5nIn0.LbWCXwiUul3udoS7s20IJYW8xus`)
      msg.edit({embed : evalcode});
    } catch (err) {
      errorcode = new Discord.RichEmbed()
      .setAuthor(`Eval by ${config.devtag}`, `https://cdn.discordapp.com/emojis/314405560701419520.png`)
      .setDescription(`**Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
      .addField(`\u200b`, `**Output:**\`\`\`js\n${clean(err)}\`\`\``, true)
      .setColor(0xFF0000)
      .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`, `https://images-ext-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Euc2FmZS5tb2UvVUJFVWwucG5nIn0.LbWCXwiUul3udoS7s20IJYW8xus`)
      msg.edit({embed : errorcode});
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
  name: 'eval',
  description: 'Evaluate short codes',
  usage: 'eval [code]'
};
