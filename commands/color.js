const c2c = require('colorcolor')
const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  const color = args.join(' ')
  const embed = new Discord.RichEmbed()
  .setTitle('Color')
  .setColor(color)
  .addField('Hex', c2c(color, 'hex'), true)
  .addField('RGBA', c2c(color, 'rgba'), true)
  .addField('HSLA', c2c(color, 'hsla'), true)
  .addField('HSV', c2c(color, 'hsv'), true)
  
  msg.channel.send(embed)
}

exports.help = {
  name: 'color',
  description: 'Convert a color.',
  usage: 'color <color>',
  fullDesc: 'Convert a color.',
  type: 'util'
}