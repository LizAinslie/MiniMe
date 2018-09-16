/* Eris Fixed */

const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  snekfetch.get('https://api.imgflip.com/get_memes').then(res => {
    const meme = res.body.data.memes[Math.floor(Math.random() * res.body.data.memes.length)]
    msg.channel.createMessage(meme.name, { file: meme.url })
  }).catch((error) => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported')
    client.rollbar.error(`[badmeme.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'badmeme',
  description: 'Have the bot find a bad meme.',
  usage: 'badmeme',
  fullDesc: 'Have the bot find a bad meme.',
  type: 'img',
  status: 2
}
