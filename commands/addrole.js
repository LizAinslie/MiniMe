const funcs = require('../modules/functions.js')
const config = require('../config.json')

exports.run = (client, message, args) => {
  if (!args[0]) return message.channel.send('You must supply a <role> option.')
  let newRole = {
    name: args[0]
  }
  if (args[1]) {
    newRole.color = args[1].toUpperCase()
  } else {
    return message.channel.send('You must supply a <color> option.')
  }
  if (args[2]) {
    newRole.position = parseInt(args[2], 10)
  } else {
    return message.channel.send('You must supply a <color> option.')
  }
  if (args[3]) {
    if (args[3].toLowerCase() === 'true') {
      newRole.mentionable = true
    } else if (args[3].toLowerCase() === 'false') {
      newRole.mentionable = false
    } else {
      return message.channel.send('You must either specify `true` or `false` for the <mentionable> option.')
    }
  } else {
    return message.channel.send('You must supply a <mentionable> option.')
  }
  if (args[4]) {
    if (args[4].toLowerCase() === 'true') {
      newRole.hoist = true
    } else if (args[4].toLowerCase() === 'false') {
      newRole.hoist = false
    } else {
      return message.channel.send('You must either specify `true` or `false` for the <separate> option.')
    }
  } else {
    return message.channel.send('You must supply a <separate> option.')
  }
  message.guild.createRole(newRole)
  .then(role => {
    const embed = {
      color: config.color,
      timestamp: new Date(),
      author: {
        name: newRole.name
      },
      fields: [
        {
          name: 'Role Name:',
          value: role.name,
          inline: true
        },
        {
          name: 'Color:',
          value: funcs.toTitleCase(role.color.toString()),
          inline: true
        },
        {
          name: 'Position:',
          value: role.position.toString(),
          inline: true
        },
        {
          name: '@mention-able:',
          value: funcs.toTitleCase(role.mentionable.toString()),
          inline: true
        },
        {
          name: 'Shown Separately:',
          value: funcs.toTitleCase(role.hoist.toString()),
          inline: true
        }
      ]
    }
    message.channel.send('A new Role has been created!', { embed })
  })
  .catch(console.error)
}

exports.help = {
  name: 'addrole',
  description: 'Have the bot add a role.',
  usage: 'addrole <name> <color> <position> <mentionable> <separate>',
  fullDesc: 'Have the bot add a role. Permissions must be set up in the server\'s settings.',
  type: 'util'
}
