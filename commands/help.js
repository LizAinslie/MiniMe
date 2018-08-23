const cmdStatuses = [] // eslint-disable-line no-unused-vars
exports.run = (client, message, params) => {
  if (!params[0]) {
//     const commandNames = Array.from(client.commands.keys())
//     const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0)
    message.channel.send({
      embed: {
        title: 'Command List',
        color: client.config.color,
        description: `Use \`${client.config.prefix}help <commandname>\` for details.`,
        author: {
          icon_url: message.author.displayAvatarURL,
          name: `Help │ Requested by ${message.author.username}#${message.author.discriminator}`
        },
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        },
        timestamp: new Date(),
        fields: [
          {
            name: ':wrench: │ **Utility Commands:**',
            value: client.commands.filter(c => c.help.type === 'util').map(c => '`' + c.help.name + '`').join(', ')
          },
          {
            name: ':loud_sound: │ **Voice Commands:**',
            value: client.commands.filter(c => c.help.type === 'vc').map(c => '`' + c.help.name + '`').join(', ')
          },
          {
            name: ':tada: │ **Fun Commands:**',
            value: client.commands.filter(c => c.help.type === 'fun').map(c => '`' + c.help.name + '`').join(', ')
          },
          {
            name: ':scroll: │ **Roleplay Commands:**',
            value: client.commands.filter(c => c.help.type === 'rp').map(c => '`' + c.help.name + '`').join(', ')
          },
          {
            name: ':moneybag: │ **Economy Commands:**',
            value: client.commands.filter(c => c.help.type === 'eco').map(c => '`' + c.help.name + '`').join(', ')
          },
          {
            name: ':hammer: │ **Moderator Commands:**',
            value: client.commands.filter(c => c.help.type === 'mod').map(c => '`' + c.help.name + '`').join(', ')
          },
          {
            name: ':underage: │ **NSFW Commands:**',
            value: client.commands.filter(c => c.help.type === 'nsfw').map(c => '`' + c.help.name + '`').join(', ')
          },
          {
            name: ':computer: │ **Developer Commands:**',
            value: client.commands.filter(c => c.help.type === 'dev').map(c => '`' + c.help.name + '`').join(', ')
          }
        ]
      }
    })
  } else {
    const cmdTypes = {
      util: 'Utility',
      fun: 'Fun',
      mod: 'Moderator',
      nsfw: 'NSFW',
      dev: 'Developer',
      rp: 'Roleplay',
      vc: 'Voice',
      eco: 'Economy'
    }

    let command = params[0]
    if (client.commands.has(command)) {
      command = client.commands.get(command)
      message.channel.send({
        embed: {
          title: command.help.name,
          author: {
            icon_url: message.author.displayAvatarURL,
            name: `Help | Requested by ${message.author.username}#${message.author.discriminator}`
          },
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 200'
          },
          timestamp: new Date(),
          color: client.config.color,
          description: command.help.fullDesc,
          fields: [
            {
              name: 'Usage',
              value: '`' + client.config.prefix + command.help.usage + '`',
              inline: true
            },
            {
              name: 'Type',
              value: cmdTypes[command.help.type],
              inline: true
            }
          ]
        }
      })
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
