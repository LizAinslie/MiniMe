const Discord = require('discord.js')
const config = require('../config.json')

exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys())
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0)
    const embed = new Discord.RichEmbed().setTitle('Command List')
    .setColor(config.color)
    .setDescription(`Use \`${client.config.prefix}help <commandname>\` for details.`)
    .addField(':wrench: | **Utility Commands:**', client.commands.filter(c => c.help.type == 'util').map(c => '`' + c.help.name + '`').join(', '))
    .addField(':tada: | **Fun Commands:**', client.commands.filter(c => c.help.type == 'fun').map(c => '`' + c.help.name + '`').join(', '))
    .addField(':hammer: | **Moderator Commands:**', client.commands.filter(c => c.help.type == 'mod').map(c => '`' + c.help.name + '`').join(', '))
    .addField(':underage: | **NSFW Commands:**', client.commands.filter(c => c.help.type == 'nsfw').map(c => '`' + c.help.name + '`').join(', '))
    .addField(':computer: | **Developer Commands:**', client.commands.filter(c => c.help.type == 'dev').map(c => '`' + c.help.name + '`').join(', '))
    message.channel.send(embed)
  } else {
    let command = params[0]
    if (client.commands.has(command)) {
      command = client.commands.get(command)
      message.channel.send(`= ${command.help.name} = \n${command.help.fullDesc}\nusage::${client.config.prefix + command.help.usage}`, {code: 'asciidoc'})
    }
  }
}

exports.help = {
  name: 'help',
  description: 'Have the bot list commands.',
  usage: 'help[ <command>]',
  fullDesc: 'Have the bot list commands. If you give it a certain command, it will give an extended description.',  
  type: 'util'
}
