const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg) => {
  snekfetch.get('https://nekos.life/api/v2/img/lizard').then(res => {
    const embed = new Discord.RichEmbed()
    .setColor(client.config.color)
    .setAuthor(`Lizard | Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(res.body.url)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation: | Failed to run the command.');
  });
}

exports.help = {
  name: 'randomlizard',
  description: 'Gets a random lizard picture.',
  usage: 'randomlizard',
  fullDesc: 'Gets a random lizard picture.',
  type: 'fun'
}