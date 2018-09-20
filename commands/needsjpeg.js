var Jimp = require('jimp')
const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
  resolveUser(client, args.join(' ')).then(user => {
    // open a file called "lenna.png"
    Jimp.read(user.displayAvatarURL, (err, img) => {
      if (err) throw err
      img.quality(3)
      .getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
        if (err) throw err

        msg.channel.createMessage({
          embed: {
            title: `${user.username} needs more JPEG!`,
            color: getEmbedColor(msg),
            image: {
              url: 'attachment://jpeg.jpeg'
            }
          }
        }, { file: buffer, name: 'jpeg.jpeg'})
      })
    })
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
