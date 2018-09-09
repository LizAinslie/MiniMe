const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg) => {
  snekfetch.get('https://nekos.life/api/v2/img/lizard').then(res => {
    msg.channel.send({
      embed: {
        author: {
          name: `Lizard │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.displayAvatarURL
        },
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
  }).catch((error) => {
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported')
    client.rollbar.error(`[badmeme.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'lizard',
  description: 'Gets a random lizard picture.',
  usage: 'lizard',
  fullDesc: 'Gets a random lizard picture.',
  type: 'img',
  status: 2
}
