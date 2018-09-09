const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg) => {
  snekfetch.get('https://catapi.glitch.me/random').then(res => {
    msg.channel.createMessage({
      embed: {
        author: {
          name: `Cat │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.displayAvatarURL
        },
        color: getEmbedColor(msg),
        footer: {
          text: 'Status: 200',
          icon_url: client.user.avatarURL
        },
        timestamp: new Date(),
        image: {
          url: res.body.url
        }
      }
    })
  }).catch((error) => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported')
    client.rollbar.error(`[badmeme.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'cat',
  description: 'Gets a random cat picture.',
  usage: 'cat',
  fullDesc: 'Gets a random cat picture.',
  type: 'img',
  status: 2
}
