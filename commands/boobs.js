const randomPuppy = require('random-puppy');
const Discord = require('discord.js')

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  randomPuppy('boobs').then(url => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`Boobs | requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setColor(client.config.color)
    .setImage(url)
    msg.channel.send(embed)
  })
}

exports.help = {
  name: 'boobs',
  description: 'Provides pictures of boobs.',
  usage: 'boobs',
  fullDesc: 'Provides pictures of boobs.',
  type: 'nsfw'
}