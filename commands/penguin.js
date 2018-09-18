const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const Logger = require('../util/Logger.js')

exports.run = (client, msg) => {
  snekfetch.get('https://animals.anidiots.guide/penguin').then(res => {
    msg.channel.createMessage({
      embed: {
        author: {
          name: `Penguin │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
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
    Logger.error(client, `[penguin.js] snekfetch error.`, error)
  })
}

exports.help = {
  name: 'penguin',
  description: 'Gets a random penguin picture.',
  usage: 'penguin',
  fullDesc: 'Gets a random penguin picture.',
  type: 'img',
  status: 2,
  aliases: []
}
