const snek = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg) => {
  snek.get('https://randomfox.ca/floof/').then(res => {
    msg.channel.createMessage({
      embed: {
        author: {
          name: `Fox │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.displayAvatarURL
        },
        color: getEmbedColor(msg),
        footer: {
          text: 'Status: 200',
          icon_url: client.user.avatarURL
        },
        timestamp: new Date(),
        image: {
          url: res.body.image
        }
      }
    })
  }).catch((error) => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported')
    client.rollbar.error(`[badmeme.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'randomfox',
  description: 'Gets a random fox picture.',
  usage: 'randomfox',
  fullDesc: 'Gets a random fox picture.',
  type: 'fun',
  status: 2
}
