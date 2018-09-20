const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')

exports.run = (client, msg, args) => {
  resolveUser(client, args.join(' ')).then(async user => {
    const {body: buffer } = await snekfetch.get(`https://api.railrunner16.me/api/gen/needsjpeg?url=${user.avatarURL}`)
    msg.channel.createMessage({
      embed: {
        title: `${user.username} needs more JPEG!`,
        color: getEmbedColor(client, msg),
        image: {
          url: 'attachment://jpeg.jpeg'
        }
      }
    }, { file: buffer, name: 'jpeg.jpeg' })
  })
}

exports.help = {
  name: 'needsjpeg',
  description: 'Show someone their avatar with more JPEG.',
  usage: 'needsjpeg <user>',
  fullDesc: 'Show someone their avatar with more JPEG.',
  type: 'fun',
  status: 2,
  aliases: []
}
