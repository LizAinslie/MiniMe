const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg) => {
  snekfetch.get('https://dog.ceo/api/breeds/image/random').then((result) => {
    snekfetch.get(result.body.message).then((result) => {
      const embed = new Discord.RichEmbed()
      .setAuthor(`Dog | Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
      .setImage(result.body)
      msg.channel.send(embed)
    }).catch((error) => {
      msg.channel.send(':exclamation: | Failed to run the command.');
    });
  }).catch((error) => {
    msg.channel.send(':exclamation: | Failed to run the command.');
  });
}

exports.help = {
  name: 'randomdog',
  description: 'Gets a random dog picture.',
  usage: 'randomdog',
  fullDesc: 'Gets a random dog picture.',
  type: 'fun'
}