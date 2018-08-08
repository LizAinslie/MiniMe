const randomPuppy = require('random-puppy');

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  randomPuppy('ass').then(url => {
    msg.channel.send('Such an ass!', { file: url })
  })
}

exports.help = {
  name: 'ass',
  description: 'Provides ass pictures.',
  usage: 'ass',
  fullDesc: 'Provides ass pictures.',
  type: 'nsfw'
}