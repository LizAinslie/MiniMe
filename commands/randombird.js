const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg) => {
  snekfetch.get('http://random.birb.pw/tweet/').then(res => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`Bird	׀ Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(`https://random.birb.pw/img/${res.body}`)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation:	׀ Failed to run the command.');
  });
}

exports.help = {
  name: 'randombird',
  description: 'Gets a random bird picture.',
  usage: 'randombird',
  fullDesc: 'Gets a random bird picture.',
  type: 'fun'
}