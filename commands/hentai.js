const randomPuppy = require('random-puppy');
const Discord = require('discord.js')

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  randomPuppy('hentai').then(url => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`Hentai | requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setColor(client.config.color)
    .setImage(url)
    msg.channel.send(embed)
  })
}

exports.help = {
  name: 'hentai',
  description: 'Provides hentai pictures.',
  usage: 'hentai',
  fullDesc: 'Provides hentai pictures.',
  type: 'nsfw'
}