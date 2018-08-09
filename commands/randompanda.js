const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg) => {
  snekfetch.get('https://animals.anidiots.guide/panda').then(res => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`Panda | Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(res.body.link)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation: | Failed to run the command.');
  });
}

exports.help = {
  name: 'randompanda',
  description: 'Gets a random panda picture.',
  usage: 'randompanda',
  fullDesc: 'Gets a random panda picture.',
  type: 'fun'
}