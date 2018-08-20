const snek = require('snekfetch')
const util = require('../util.js')

exports.run = (client, msg, args) => {
  util.resolveUser(client, args.join(' ')).then(user => {
    snek.get('https://nekos.life/api/v2/img/cuddle').then(res => {
      msg.channel.send({
        embed: {
          author: {
            icon_url: msg.author.displayAvatarURL,
            text: `${msg.author.username} cuddled ${user.username}.`
          },
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 200'
          },
          image: {
            url: res.body.url
          }
        }
      })
    }).catch(err => {
      msg.channel.send(':exclamation:	׀ Failed to run the command. This incident has been reported.')
      client.rollbar.error('[cuddle.js] Error getting image from nekos.life: ' + err)
    })
  }).catch(err => {
    msg.channel.send(':exclamation:	׀ Failed to run the command. This incident has been reported.')
    client.rollbar.error('[cuddle.js] Error resolving user: ' + err)
  })
}

exports.help = {
  name: 'cuddle',
  description: 'Cuddle a user.',
  usage: 'cuddle <user>',
  fullDesc: 'Cuddle a user.',
  type: 'rp'
}