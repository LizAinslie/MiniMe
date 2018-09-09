const snekfetch = require('snekfetch')
const Discord = require('discord.js')
const Logger = require('../util/Logger.js')

exports.run = (client, msg) => {
  snekfetch.get('https://animals.anidiots.guide/penguin').then(res => {
    const embed = new Discord.RichEmbed()
    .setColor(client.config.color)
    .setAuthor(`Penguin │ Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(res.body.link)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported')
    Logger.error(`[penguin.js] snekfetch error.`, error)
  })
}

exports.help = {
  name: 'penguin',
  description: 'Gets a random penguin picture.',
  usage: 'penguin',
  fullDesc: 'Gets a random penguin picture.',
  type: 'img',
  status: 2
}
