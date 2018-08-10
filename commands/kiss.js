const snek = require('snekfetch')
const Discord = require('discord.js')
const util = require('../util.js')

exports.run = (client, msg, args) => {
  util.resolveUser(client, args.join(' ')).then(user => {
    snek.get('https://nekos.life/api/kiss').then(res => {
      const embed = new Discord.RichEmbed()
      .setTitle(`${msg.author.username} kissed ${user.username}!`)
      .setColor(client.config.color)
      .setImage(res.body.url)
    }).catch(err => {
      msg.channel.send(':exclamation: | Failed to run the command. This incident has been reported.')
      client.rollbar.error('[kiss.js] Error getting image from nekos.life: ' + err.message)
    })
  }).catch(err => {
    msg.channel.send(':exclamation: | Failed to run the command. This incident has been reported.')
    client.rollbar.error('[kiss.js] Error resolving user: ' + err.message)
  })
}

exports.help = {
  name: 'kiss',
  description: 'Kiss a user.',
  usage: 'kiss <user>',
  fullDesc: 'Kiss a user.',
  type: 'rp'
}