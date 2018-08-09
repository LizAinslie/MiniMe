const util = require('../util.js')
const Discord = require('discord.js')
const config = require('../config.json')

exports.run = (client, msg, args) => {
  util.resolveUser(client, args.join(' ')).then(user => {
    const embed = new Discord.RichEmbed()
    .setColor(config.color)
    .setTitle(`${user.username}#${user.discriminator}'s avatar:`)
    .setImage(user.avatarURL)
    msg.channel.send(embed)
  }).catch((error) => {
    msg.channel.send(':exclamation: | Failed to run the command.');
  });
}

exports.help = {
  name: 'avatar',
  description: 'Steals an avatar.',
  usage: 'avatar <userId>',
  fullDesc: 'Steals an avatar. You must supply an id.',
  type: 'util'
}