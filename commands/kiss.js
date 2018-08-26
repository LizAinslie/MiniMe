const snek = require('snekfetch')
const util = require('../util.js')

exports.run = (client, msg, args) => {
  util.resolveUser(client, args.join(' ')).then(user => {
    snek.get('https://nekos.life/api/kiss').then(res => {
      msg.channel.send({
        embed: {
          author: {
            icon_url: msg.author.displayAvatarURL,
            name: `${msg.author.username} kissed ${user.username}!`
          },
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 200'
          },
          image: {
            url: res.body.url
          },
          color: client.config.color
        }
      })
    }).catch(err => {
      msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported.')
      client.rollbar.error('[kiss.js] Error getting image from nekos.life: ' + err)
    })
  }).catch(err => {
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported.')
    client.rollbar.error('[kiss.js] Error resolving user: ' + err)
  })
}

exports.help = {
  name: 'kiss',
  description: 'Kiss a user.',
  usage: 'kiss <user>',
  fullDesc: 'Kiss a user.',
  type: 'rp',
  status: 2
}
