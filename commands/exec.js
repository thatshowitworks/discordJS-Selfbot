const Discord = require('discord.js');
const child = require('child_process');
const util = require('util');
const fs = require('fs');
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
exports.run = function(client, message, args) {
function clean(text) {
  if(typeof(text) === 'string')
  return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  else
  return text;
}
  const content = message.content.split(' ').slice(1).join(' ');
  message.edit(`Executing...`).then(mes => {
    child.exec(`${content}`, (error, stdout, stderr) => {
    if(stdout) {
      if(typeof stdout !== 'string') stdout = util.inspect(stdout);
      if(stdout.length > 1000) {
        let stdoutlong = new Discord.RichEmbed()
        .setAuthor(`Exec by ${config.devtag}`)
        .setDescription(`**Input:**\n\n\`\`\`bash\n${content}\`\`\``)
        .addField(`\u200b`, `**Output:**\n\n\`\`\`bash\nOutput too long, logged to ${__dirname}\\exec.txt\`\`\``, true)
        .setColor(`GREEN`)
        .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`, `https://images-ext-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Euc2FmZS5tb2UvVUJFVWwucG5nIn0.LbWCXwiUul3udoS7s20IJYW8xus`)
        message.edit({embed : stdoutlong})
        return fs.writeFile(`exec.txt`, `${clean(stdout)}`)
      }else {
        stdoutshort = new Discord.RichEmbed()
        .setAuthor(`Exec by ${config.devtag}`)
        .setDescription(`**Input:**\n\n\`\`\`bash\n${content}\`\`\``)
        .addField(`\u200b`, `**Output:**\n\n\`\`\`bash\n${clean(stdout)}\`\`\``, true)
        .setColor(`GREEN`)
        .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`, `https://images-ext-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Euc2FmZS5tb2UvVUJFVWwucG5nIn0.LbWCXwiUul3udoS7s20IJYW8xus`)
        message.edit({embed : stdoutshort})
      }
    }else if(stderr) {
        if(typeof stderr !== 'string') stderr = util.inspect(stderr);
        if(stderr.length > 1000) {
          let stderrlong = new Discord.RichEmbed()
          .setAuthor(`Exec by ${config.devtag}`)
          .setDescription(`**Input:**\n\n\`\`\`bash\n${content}\`\`\``)
          .addField(`\u200b`, `**Output:**\n\n\`\`\`bash\nOutput too long, logged to ${__dirname}\\exec.txt\`\`\``, true)
          .setColor(`RED`)
          .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`, `https://images-ext-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Euc2FmZS5tb2UvVUJFVWwucG5nIn0.LbWCXwiUul3udoS7s20IJYW8xus`)
          message.edit({embed : stderrlong})
          return fs.writeFile(`exec.txt`, `${clean(stderr)}`)
        }else {
          stderrshort = new Discord.RichEmbed()
          .setAuthor(`Exec by ${config.devtag}`)
          .setDescription(`**Input:**\n\n\`\`\`bash\n${content}\`\`\``)
          .addField(`\u200b`, `**Output:**\n\n\`\`\`bash\n${clean(stderr)}\`\`\``, true)
          .setColor(`RED`)
          .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`, `https://images-ext-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Euc2FmZS5tb2UvVUJFVWwucG5nIn0.LbWCXwiUul3udoS7s20IJYW8xus`)
          message.edit({embed : stderrshort})
        }
      }else if(error) {
        if(typeof error !== 'string') error = util.inspect(error);
        if(error.length > 1000) {
          let errlong = new Discord.RichEmbed()
          .setAuthor(`Exec by ${config.devtag}`)
          .setDescription(`**Input:**\n\n\`\`\`bash\n${content}\`\`\``)
          .addField(`\u200b`, `**Output:**\n\n\`\`\`bash\nOutput too long, logged to ${__dirname}\\exec.txt\`\`\``, true)
          .setColor(`RED`)
          .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`, `https://images-ext-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Euc2FmZS5tb2UvVUJFVWwucG5nIn0.LbWCXwiUul3udoS7s20IJYW8xus`)
          message.edit({embed : errlong})
          return fs.writeFile(`exec.txt`, `${clean(error)}`)
        }else {
          errshort = new Discord.RichEmbed()
          .setAuthor(`Exec by ${config.devtag}`)
          .setDescription(`**Input:**\n\n\`\`\`bash\n${content}\`\`\``)
          .addField(`\u200b`, `**Output:**\n\n\`\`\`bash\n${clean(error)}\`\`\``, true)
          .setColor(`RED`)
          .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`, `https://images-ext-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Euc2FmZS5tb2UvVUJFVWwucG5nIn0.LbWCXwiUul3udoS7s20IJYW8xus`)
          message.edit({embed : errshort})
        }
    }
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
  name: 'exec',
  description: 'Execute code',
  usage: 'exec [code]'
};
