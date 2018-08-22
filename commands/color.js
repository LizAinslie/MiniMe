const c2c = require('colorcolor')

exports.run = (client, msg, args) => {
  const color = args.join(' ')
  msg.channel.send({
    embed: {
      author: {
        icon_url: msg.author.displayAvatarURL,
        text: `Color │ Requested by ${msg.author.username}#${msg.author.discriminator}`
      },
      color: client.config.color,
      footer: {
        icon_url: client.user.avatarURL,
        text: 'Status: 200'
      },
      timestamp: new Date(),
      fields: [
        {
          name: 'Hex',
          value: c2c(color, 'hex'),
          inline: true
        },
        {
          name: 'RGBA',
          value: c2c(color, 'rgba'),
          inline: true
        },
        {
          name: 'HSLA',
          value: c2c(color, 'hsla'),
          inline: true
        },
        {
          name: 'HSV',
          value: c2c(color, 'hsv'),
          inline: true
        }
      ]
    }
  })
}

exports.help = {
  name: 'color',
  description: 'Convert a color.',
  usage: 'color <color>',
  fullDesc: 'Convert a color.',
  type: 'util'
}
