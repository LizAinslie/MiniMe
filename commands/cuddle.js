const snek = require('snekfetch')
const Discord = require('discord.js')
const util = require('../util.js')

exports.run = (client, msg, args) => {
  util.resolveUser(client, args.join(' ')).then(user => {
    snek.get('https://nekos.life/api/v2/img/cuddle').then(res => {
      const embed = new Discord.RichEmbed()
      .setTitle(`${msg.author.username} cuddled ${user.username}.`)
      .setColor(client.config.color)
      .setImage(res.body.url)
      msg.channel.send(embed)
    }).catch(err => {
      msg.channel.send(':exclamation: | Failed to run the command. This incident has been reported.')
      client.rollbar.error('[cuddle.js] Error getting image from nekos.life: ' + err.message)
    })
  }).catch(err => {
    msg.channel.send(':exclamation: | Failed to run the command. This incident has been reported.')
    client.rollbar.error('[cuddle.js] Error resolving user: ' + err.message)
  })
}

exports.help = {
  name: 'cuddle',
  description: 'Cuddle a user.',
  usage: 'cuddle <user>',
  fullDesc: 'Cuddle a user.',
  type: 'rp'
}