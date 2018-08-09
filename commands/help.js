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
    const cmdTypes = {
      util: 'Utility',
      fun: 'Fun',
      mod: 'Moderator',
      nsfw: 'NSFW',
      dev: 'Developer'
    }
    let command = params[0]
    if (client.commands.has(command)) {
      command = client.commands.get(command)
      const embed = new Discord.RichEmbed().setTitle(command.help.name)
      .setColor(config.color)
      .setDescription(command.help.fullDesc)
      .addField('Usage', '`' + client.config.prefix + command.help.usage + '`', true)
      .addField('Type', cmdTypes[command.help.type], true)
      message.channel.send(embed)
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
