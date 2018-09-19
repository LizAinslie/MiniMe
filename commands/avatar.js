/* Eris Fixed */

const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
  if (args[0]) {
    resolveUser(client, args.join(' ')).then(user => {
      msg.channel.createMessage({
        embed: {
          color: getEmbedColor(client, msg),
          author: {
            icon_url: msg.author.avatarURL,
            name: `${user.username}#${user.discriminator}'s avatar │ Requested by ${msg.author.username}#${msg.author.discriminator}`
          },
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 200'
          },
          timestamp: new Date(),
          image: {
            url: user.avatarURL
          }
        }
      })
    }).catch((error) => {
      msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
      client.rollbar.error(`[avatar.js] resolveUser error: ${error}`)
    })
  } else {
    msg.channel.createMessage({
      embed: {
        color: getEmbedColor(client, msg),
        author: {
          icon_url: msg.author.avatarURL,
          name: `${msg.author.username}#${msg.author.discriminator}'s avatar │ Requested by ${msg.author.username}#${msg.author.discriminator}`
        },
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        },
        timestamp: new Date(),
        image: {
          url: msg.author.avatarURL
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
  type: 'util',
  status: 2,
  aliases: ['pfp']
}
