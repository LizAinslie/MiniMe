const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg) => {
  snekfetch.get('https://api.bunnies.io/v2/loop/random/?media=gif,png').then(res => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`Bunny │ Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(res.body.media.poster)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported')
    client.rollbar.error(`[badmeme.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'bunny',
  description: 'Gets a random bunny picture.',
  usage: 'bunny',
  fullDesc: 'Gets a random bunny picture.',
  type: 'img',
  status: 2
}
