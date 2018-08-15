const randomPuppy = require('random-puppy');
const Discord = require('discord.js')

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  randomPuppy('ass').then(url => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`Ass | requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setColor(client.config.color)
    .setImage(url)
    msg.channel.send(embed)
  })
}

exports.help = {
  name: 'ass',
  description: 'Provides ass pictures.',
  usage: 'ass',
  fullDesc: 'Provides ass pictures.',
  type: 'nsfw'
}