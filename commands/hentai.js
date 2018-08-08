const randomPuppy = require('random-puppy');

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  randomPuppy('hentai').then(url => {
    msg.channel.send('Here, take some real hentai.', { file: url })
  })
}

exports.help = {
  name: 'hentai',
  description: 'Provides hentai pictures.',
  usage: 'hentai',
  fullDesc: 'Provides hentai pictures.',
  type: 'nsfw'
}