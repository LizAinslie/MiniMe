const randomPuppy = require('random-puppy')

exports.run = (client, msg) => {
  randomPuppy('memes').then(url => {
    msg.channel.send({
      embed: {
        color: client.config.color,
        author: {
          icon_url: msg.author.displayAvatarURL,
          name: `Meme | Requested by ${msg.author.username}#${msg.author.discriminator}`
        },
        image: {
          url: url
        },
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        },
        timestamp: new Date()
      }
    })
  })
}

exports.help = {
  name: 'redditmeme',
  description: 'Gets a random meme from Reddit.',
  usage: 'redditmeme',
  fullDesc: 'Gets a random meme from Reddit.',
  type: 'fun'
}