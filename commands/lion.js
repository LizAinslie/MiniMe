const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg) => {
  snekfetch.get('https://animals.anidiots.guide/lion').then(res => {
    const embed = new Discord.RichEmbed()
    .setColor(client.config.color)
    .setAuthor(`Lion │ Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(res.body.link)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported')
    client.rollbar.error(`[badmeme.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'lion',
  description: 'Gets a random lion picture.',
  usage: 'lion',
  fullDesc: 'Gets a random lion picture.',
  type: 'img',
  status: 2
}
