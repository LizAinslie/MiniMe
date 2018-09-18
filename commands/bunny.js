/* Eris Fixed */

const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg) => {
  snekfetch.get('https://api.bunnies.io/v2/loop/random/?media=gif,png').then(res => {
    msg.channel.createMessage({
      embed: {
        author: {
          name: `Bunny │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.avatarURL
        },
        color: getEmbedColor(client, msg),
        footer: {
          text: 'Status: 200',
          icon_url: client.user.avatarURL
        },
        timestamp: new Date(),
        image: {
          url: res.body.media.poster
        }
      }
    })
  }).catch((error) => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported')
    client.rollbar.error(`[badmeme.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'bunny',
  description: 'Gets a random bunny picture.',
  usage: 'bunny',
  fullDesc: 'Gets a random bunny picture.',
  type: 'img',
  status: 2,
  aliases: []
}
