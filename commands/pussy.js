const randomPuppy = require('random-puppy');

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  randomPuppy('pussy').then(url => {
    msg.channel.send('Watch it! This one\'s not a cat!', { file: url })
  })
}

exports.help = {
  name: 'pussy',
  description: 'Gives you a picture of a pussy.',
  usage: 'pussy',
  fullDesc: 'Gives you a picture of a pussy.',
  type: 'nsfw'
}