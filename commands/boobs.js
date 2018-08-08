const randomPuppy = require('random-puppy');

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  randomPuppy('boobs').then(url => {
    msg.channel.send('How do you like them melons?', { file: url })
  })
}

exports.help = {
  name: 'boobs',
  description: 'Provides pictures of boobs.',
  usage: 'boobs',
  fullDesc: 'Provides pictures of boobs.',
  type: 'nsfw'
}