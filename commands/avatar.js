const util = require('../util.js')

exports.run = (client, msg, args) => {
  if (args[0]) {
    util.resolveUser(client, args.join(' ')).then(user => {
      msg.channel.send({
        embed: {
          color: client.config.color,
          author: {
            icon_url: msg.author.displayAvatarURL,
            name: `${user.username}#${user.discriminator}'s avatar │ Requested by ${msg.author.username}#${msg.author.discriminator}`
          },
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 200'
          },
          timestamp: new Date(),
          image: {
            url: user.displayAvatarURL
          }
        }
      })
    }).catch((error) => {
      msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported.')
      client.rollbar.error(`[avatar.js] resolveUser error: ${error}`)
    })
  } else {
    msg.channel.send({
      embed: {
        color: client.config.color,
        author: {
          icon_url: msg.author.displayAvatarURL,
          name: `${msg.author.username}#${msg.author.discriminator}'s avatar │ Requested by ${msg.author.username}#${msg.author.discriminator}`
        },
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        },
        timestamp: new Date(),
        image: {
          url: msg.author.displayAvatarURL
        }
      }
    })
  }
}

exports.help = {
  name: 'avatar',
  description: 'Steals an avatar.',
  usage: 'avatar <user>',
  fullDesc: 'Steals an avatar. You must supply an id or a mention.',
  type: 'util'
}
