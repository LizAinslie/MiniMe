const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const Logger = require('../util/Logger.js')

exports.run = (client, msg) => {
  snekfetch.get('https://animals.anidiots.guide/tiger').then(res => {
    msg.channel.createMessage({
      embed: {
        author: {
          name: `Tiger │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.displayAvatarURL
        },
        color: getEmbedColor(msg),
        timestamp: new Date(),
        image: {
          url: res.body.link
        },
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        }
      }
    })
  }).catch((error) => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported')
    Logger.error(client, `[tiger.js] snekfetch error.`, error)
  })
}

exports.help = {
  name: 'tiger',
  description: 'Gets a random tiger picture.',
  usage: 'tiger',
  fullDesc: 'Gets a random tiger picture.',
  type: 'img',
  status: 2
}
