exports.run = (client, msg, args) => {
  const util = require('../util.js')
  util.resolveUser(client, args.join(' ')).then(user => {
    msg.channel.send({
      embed: {
        color: client.config.color,
        author: {
          icon_url: msg.author.displayAvatarURL,
          name: `${user.username}#${user.discriminator}'s avatar │ Requested by ${msg.author.username}#${msg.author.discriminator}`
        },
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        },
        timestamp: new Date(),
        image: {
          url: user.avatarURL
        }
      }
    })
  }).catch((error) => {
    msg.channel.send(':exclamation: │ Failed to run the command.')
  })
}

exports.help = {
  name: 'avatar',
  description: 'Steals an avatar.',
  usage: 'avatar <user>',
  fullDesc: 'Steals an avatar. You must supply an id or a mention.',
  type: 'util'
}
