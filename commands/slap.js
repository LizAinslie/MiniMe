const snek = require('snekfetch')
const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const Logger = require('../util/Logger.js')

exports.run = (client, msg, args) => {
  resolveUser(client, args.join(' ')).then(user => {
    snek.get('https://nekos.life/api/v2/img/slap').then(res => {
      msg.channel.createMessage({
        embed: {
          title: `${msg.author.username} slapped ${user.username}.`,
          color: getEmbedColor(msg),
          timestamp: new Date(),
          image: {
            url: res.body.url
          },
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 200'
          }
        }
      })
    }).catch(err => {
      msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
      Logger.error('[slap.js] Error getting image from nekos.life.', err)
    })
  }).catch(err => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
    Logger.error('[slap.js] Error resolving user.', err)
  })
}

exports.help = {
  name: 'slap',
  description: 'Slap a user.',
  usage: 'slap <user>',
  fullDesc: 'Slap a user.',
  type: 'rp',
  status: 2
}
