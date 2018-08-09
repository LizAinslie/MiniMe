const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg) => {
  snekfetch.get('https://animals.anidiots.guide/lion').then(res => {
    const embed = new Discord.RichEmbed()
    .setColor(client.config.color)
    .setAuthor(`Lion | Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(res.body.link)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation: | Failed to run the command.');
  });
}

exports.help = {
  name: 'randomlion',
  description: 'Gets a random lion picture.',
  usage: 'randomlion',
  fullDesc: 'Gets a random lion picture.',
  type: 'fun'
}