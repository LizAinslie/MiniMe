const snek = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg) => {
  snek.get('https://randomfox.ca/floof/').then(res => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`Fox | Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
    .setImage(res.body.image)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation: | Failed to run the command.');
  });
}

exports.help = {
  name: 'randomfox',
  description: 'Gets a random fox picture.',
  usage: 'randomfox',
  fullDesc: 'Gets a random fox picture.',
  type: 'fun'
}