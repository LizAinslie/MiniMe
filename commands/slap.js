const snek = require('snekfetch')
const Discord = require('discord.js')
const util = require('../util.js')

exports.run = (client, msg, args) => {
  util.resolveUser(client, args.join(' ')).then(user => {
    snek.get('https://nekos.life/api/v2/img/slap').then(res => {
      const embed = new Discord.RichEmbed()
      .setTitle(`${msg.author.username} slapped ${user.username}.`)
      .setColor(client.config.color)
      .setImage(res.body.url)
      msg.channel.send(embed)
    }).catch(err => {
      msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported.')
      client.rollbar.error('[slap.js] Error getting image from nekos.life: ' + err.message)
    })
  }).catch(err => {
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported.')
    client.rollbar.error('[slap.js] Error resolving user: ' + err.message + '][' + err.body)
  })
}

exports.help = {
  name: 'slap',
  description: 'Slap a user.',
  usage: 'slap <user>',
  fullDesc: 'Slap a user.',
  type: 'rp',
  status: 2
}
