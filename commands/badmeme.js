const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  snekfetch.get('https://api.imgflip.com/get_memes').then(res => {
    const meme = res.body.data.memes[Math.floor(Math.random() * res.body.data.memes.length)]
    msg.channel.send(meme.name, { file: meme.url })
  }).catch((error) => {
    msg.channel.send(':exclamation: | Failed to run the command.');
  });
}

exports.help = {
  name: 'badmeme',
  description: 'Have the bot find a bad meme.',
  usage: 'badmeme',
  fullDesc: 'Have the bot find a bad meme.',
  type: 'fun'
}