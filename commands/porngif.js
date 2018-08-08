const randomPuppy = require('random-puppy');

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  randomPuppy('porn_gifs').then(url => {
    msg.channel.send('', { file: url })
  })
}

exports.help = {
  name: 'porngif',
  description: 'Provides a gif of porn.',
  usage: 'porngif',
  fullDesc: 'Provides a gif of porn.',
  type: 'nsfw'
}