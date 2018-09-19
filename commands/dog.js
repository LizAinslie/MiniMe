/* Eris Fixed */

const randomPuppy = require('random-puppy')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg) => {
  randomPuppy().then(url => {
    msg.channel.createMessage({
      embed: {
        color: getEmbedColor(client, msg),
        author: {
          icon_url: msg.author.avatarURL,
          name: `Dog │ Requested by ${msg.author.username}#${msg.author.discriminator}`
        },
        image: {
          url: url
        },
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        },
        timestamp: new Date()
      }
    })
  })
}

exports.help = {
  name: 'dog',
  description: 'Gets a random dog picture.',
  usage: 'dog',
  fullDesc: 'Gets a random dog picture.',
  type: 'img',
  status: 2,
  aliases: []
}
