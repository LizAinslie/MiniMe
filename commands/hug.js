const snek = require('snekfetch')
const Discord = require('discord.js')
const util = require('../util.js')

exports.run = (client, msg, args) => {
  util.resolveUser(client, args.join(' ')).then(user => {
    snek.get('https://nekos.life/api/hug').then(res => {
      const embed = new Discord.RichEmbed()
      .setTitle(`${msg.author.username} gave ${user.username} a hug!`)
      .setColor(client.config.color)
      .setImage(res.body.url)
    }).catch(err => {
      msg.channel.send(':exclamation: | Failed to run the command. This incident has been reported.')
      client.rollbar.error('[hug.js] Error getting image from nekos.life: ' + err.message)
    })
  }).catch(err => {
    msg.channel.send(':exclamation: | Failed to run the command. This incident has been reported.')
    client.rollbar.error('[hug.js] Error resolving user: ' + err.message)
  })
}

exports.help = {
  name: 'hug',
  description: 'Hug a user.',
  usage: 'hug <user>',
  fullDesc: 'Hug a user.',
  type: 'rp'
}