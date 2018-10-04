/* Eris Fixed */
const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg) => {
  snekfetch.get('https://random-d.uk/api/v1/random?type=jpg').then(res => {
    msg.channel.createMessage({
      embed: {
        author: {
          name: `Duck │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.avatarURL
        },
        color: getEmbedColor(client, msg),
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
  name: 'duck',
  description: 'Gets a random duck picture.',
  usage: 'duck',
  fullDesc: 'Gets a random duck picture.',
  type: 'img',
  status: 2,
  aliases: []
}
