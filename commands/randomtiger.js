const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg) => {
  snekfetch.get('https://animals.anidiots.guide/tiger').then(res => {
    const embed = new Discord.RichEmbed()
    .setColor(client.config.color)
    .setAuthor(`Tiger	׀ Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(res.body.link)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation:	׀ Failed to run the command.');
  });
}

exports.help = {
  name: 'randomtiger',
  description: 'Gets a random tiger picture.',
  usage: 'randomtiger',
  fullDesc: 'Gets a random tiger picture.',
  type: 'fun'
}