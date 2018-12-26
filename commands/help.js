/* Eris Fixed */

const getEmbedColor = require('../util/getHighestRoleColor.js')

const cmdStatuses = [
  '<:offline:313956277237710868>',
  '<:away:313956277220802560>',
  '<:online:313956277808005120>'
] // eslint-disable-line no-unused-vars

exports.run = (client, message, params) => {
  if (!params[0]) {
//     const commandNames = Array.from(client.commands.keys())
//     const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0)
    message.channel.createMessage({
      embed: {
        title: 'Command List',
        color: getEmbedColor(client, message),
        description: `Use \`${client.config.prefix}help <commandname>\` for usage and details.`,
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
            name: ':wrench: │ __**Utility Commands:**__',
            value: client.commands.filter(c => c.help.type === 'util').map(c => cmdStatuses[c.help.status] + '`' + c.help.name + '`').join(', ') + '\n​'
          },
          {
            name: ':loud_sound: │ __**Voice Commands:**__',
            value: client.commands.filter(c => c.help.type === 'vc').map(c => cmdStatuses[c.help.status] + '`' + c.help.name + '`').join(', ') + '\n​'
          },
          {
            name: ':tada: │ __**Fun Commands:**__',
            value: client.commands.filter(c => c.help.type === 'fun').map(c => cmdStatuses[c.help.status] + '`' + c.help.name + '`').join(', ') + '\n​'
          },
          {
            name: ':camera_with_flash: │ __**Random Image Commands:**__',
            value: client.commands.filter(c => c.help.type === 'img').map(c => cmdStatuses[c.help.status] + '`' + c.help.name + '`').join(', ') + '\n​'
          },
          {
            name: ':sunrise_over_mountains: │ __**Image Manipulation Commands:**__',
            value: client.commands.filter(c => c.help.type === 'imgen').map(c => cmdStatuses[c.help.status] + '`' + c.help.name + '`').join(', ') + '\n​'
          },
          {
            name: ':scroll: │ __**Roleplay Commands:**__',
            value: client.commands.filter(c => c.help.type === 'rp').map(c => cmdStatuses[c.help.status] + '`' + c.help.name + '`').join(', ') + '\n​'
          },
          {
            name: ':moneybag: │ __**Economy Commands:**__',
            value: client.commands.filter(c => c.help.type === 'eco').map(c => cmdStatuses[c.help.status] + '`' + c.help.name + '`').join(', ') + '\n​'
          },
          {
            name: ':hammer: │ __**Moderator Commands:**__',
            value: client.commands.filter(c => c.help.type === 'mod').map(c => cmdStatuses[c.help.status] + '`' + c.help.name + '`').join(', ') + '\n​'
          },
          {
            name: ':underage: │ __**NSFW Commands:**__',
            value: client.commands.filter(c => c.help.type === 'nsfw').map(c => cmdStatuses[c.help.status] + '`' + c.help.name + '`').join(', ') + '\n​'
          },
          {
            name: ':computer: │ __**Developer Commands:**__',
            value: client.commands.filter(c => c.help.type === 'dev').map(c => cmdStatuses[c.help.status] + '`' + c.help.name + '`').join(', ') + '\n​'
          },
          {
            name: ':key: │ __**Key**__',
            value: `${cmdStatuses[0]} - **Off** (Not working)\n${cmdStatuses[1]} - **W. I. P.** (May not be fully working, or may not be working at all)\n${cmdStatuses[2]} - **On** (Fully working)`
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
    const cmdStatusNames = [
      'Offline',
      'W. I. P.',
      'Online'
    ]

    let command = params[0]
    if (client.commands.has(command)) {
      command = client.commands.get(command)
      message.channel.createMessage({
        embed: {
          title: command.help.name,
          author: {
            icon_url: message.author.displayAvatarURL,
            name: `Help │ Requested by ${message.author.username}#${message.author.discriminator}`
          },
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 200'
          },
          timestamp: new Date(),
          color: getEmbedColor(client, message),
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
            },
            {
              name: 'Status',
              value: cmdStatuses[command.help.status] + ' │ ' + cmdStatusNames[command.help.status],
              inline: true
            },
            {
              name: 'Aliases',
              value: command.help.aliases.map(a => `\`${a}\``).join(', ').length > 0 ? command.help.aliases.map(a => `\`${a}\``).join(', ') : 'None',
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
  type: 'util',
  status: 2,
  aliases: ['halp', 'commands', 'cmds']
}
