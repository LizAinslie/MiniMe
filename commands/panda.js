const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg) => {
  snekfetch.get('https://animals.anidiots.guide/panda').then(res => {
    msg.channel.send({
      embed: {
        author: {
          name: `Panda │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
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
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported')
    client.rollbar.error(`[badmeme.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'panda',
  description: 'Gets a random panda picture.',
  usage: 'panda',
  fullDesc: 'Gets a random panda picture.',
  type: 'img',
  status: 2
}
