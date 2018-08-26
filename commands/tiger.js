const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg) => {
  snekfetch.get('https://animals.anidiots.guide/tiger').then(res => {
    const embed = new Discord.RichEmbed()
    .setColor(client.config.color)
    .setAuthor(`Tiger │ Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(res.body.link)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported')
    client.rollbar.error(`[badmeme.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'tiger',
  description: 'Gets a random tiger picture.',
  usage: 'tiger',
  fullDesc: 'Gets a random tiger picture.',
  type: 'img',
  status: 2
}
