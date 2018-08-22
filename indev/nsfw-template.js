const randomPuppy = require('random-puppy')

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!')
  randomPuppy('lesbians').then(url => {
    msg.channel.send('Here, have some lesbian porn.', { file: url })
  })
}

exports.help = {
  name: 'lesbian',
  description: 'Provides lesbian porn.',
  usage: 'lesbian',
  fullDesc: 'Provides lesbian porn.',
  type: 'nsfw'
}
