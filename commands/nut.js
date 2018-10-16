/* Eris Fixed */

const Jimp = require('jimp')

exports.run = (client, message, args) => {
  let suffix = args.join(' ') || "The user who ran this command is currently participating in a gay orgy, because he didn't put any text after the command."
  Jimp.read(`${__dirname}/../assets/nut.jpg`, (err, image) => {
    if (err) return console.log(err)
    new Jimp(630, 150, function (err, text) {
      if (err) return console.log(err)
      Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) {
         text.print(font, 0, 0, suffix, 650)
         image.composite(text, 15, 5)
         image.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
           if (err) return console.log(err)
           message.channel.createMessage('', { file: buffer, name: 'nut.jpg' })
         })
      })
    })
  })
}

exports.help = {
  name: 'nut',
  description: 'Put text in the Nut meme.',
  usage: 'nut <text>',
  fullDesc: 'Put text in the Nut meme.',
  type: 'fun',
  status: 1,
  aliases: []
}
