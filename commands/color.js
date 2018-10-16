/* Eris Fixed */

const c2c = require('colorcolor')
const getEmbedColor = require('../util/getHighestRoleColor.js')
// const Canvas = require('canvas')

exports.run = (client, msg, args) => {
  const color = args.join(' ')
  // const canvas = Canvas.createCanvas(128, 128)
  // const ctx = canvas.getContext('2d')

  // ctx.fillStyle = color
  // ctx.fillRect(0, 0, canvas.width, canvas.height)

  msg.channel.createMessage({
    embed: {
      author: {
        icon_url: msg.author.displayAvatarURL,
        name: `Color │ Requested by ${msg.author.username}#${msg.author.discriminator}`
      },
      color: getEmbedColor(msg),
      thumbnail: {
        url: 'attachment://color.png'
      },
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
  type: 'util',
  status: 2,
  aliases: []
}
