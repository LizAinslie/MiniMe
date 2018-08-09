const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg) => {
  snekfetch.get('https://random-d.uk/api/v1/random?type=jpg').then(res => {
    const embed = new Discord.RichEmbed()
    .setColor(client.config.color)
    .setAuthor(`Duck | Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(res.body.url)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation: | Failed to run the command.');
  });
}

exports.help = {
  name: 'randomduck',
  description: 'Gets a random duck picture.',
  usage: 'randomduck',
  fullDesc: 'Gets a random duck picture.',
  type: 'fun'
}