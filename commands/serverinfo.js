const Discord = require('discord.js')

exports.run = (client, msg) => {
  const guild = msg.guild
  const embed = new Discord.RichEmbed()
  .setTitle('Server Information')
  .setColor(client.config.color)
  .setThumbnail(guild.iconURL)
  .addField('Region', guild.region, true)
  .addField('Owner', guild.owner.toString(), true)
  .addField('ID', guild.id, true)
  .addField('Members', guild.members.size, true)
  .addField('Channels', guild.channels.size, true)
  .addField('Large?', guild.large ? 'Yes' : 'No', true)
  .addField('AFK Channel', guild.afkChannel ? guild.afkChannel.toString() : 'None', true)
  .addField('Roles', guild.roles.map(r =>  `<@&${r.id}>`).join(', '), true)
  .addField('Custom Emoji', guild.emojis.map(e => `${e}`).join(', '), true)
  msg.channel.send(embed)
}

exports.help = {
  name: 'serverinfo',
  description: 'Gets information about the server you are currently in.',
  usage: 'serverinfo',
  fullDesc: 'Gets information about the server you are currently in.',
  type: 'util'
}