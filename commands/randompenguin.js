const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg) => {
  snekfetch.get('https://animals.anidiots.guide/penguin').then(res => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`Penguin | Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(res.body.link)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation: | Failed to run the command.');
  });
}

exports.help = {
  name: 'randompenguin',
  description: 'Gets a random penguin picture.',
  usage: 'randompenguin',
  fullDesc: 'Gets a random penguin picture.',
  type: 'fun'
}