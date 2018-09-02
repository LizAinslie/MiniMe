const snekfetch = require('snekfetch')
const Discord = require('discord.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg) => {
  snekfetch.get('https://catapi.glitch.me/random').then(res => {
    const embed = new Discord.RichEmbed()
    .setColor(getEmbedColor(msg))
    .setAuthor(`Cat │ Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(res.body.url)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported')
    client.rollbar.error(`[badmeme.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'cat',
  description: 'Gets a random cat picture.',
  usage: 'cat',
  fullDesc: 'Gets a random cat picture.',
  type: 'img',
  status: 2
}
