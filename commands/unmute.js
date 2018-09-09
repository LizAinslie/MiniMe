const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.createMessage(':no_entry_sign: │ You need the permission `MANAGE_ROLES` to use this.')
  let member = msg.mentions.members.first()
  if (!member) return msg.channel.createMessage(':interrobang: │ You must mention a valid member of this server!')

  let reason = args.slice(1).join(' ')
  if (!reason) reason = 'No reason provided.'

  member.removeRole(client.guildSettings.getProp(msg.guild.id, 'muteRole'))
  const embed = new Discord.RichEmbed()
  .setTitle('User Unmute')
  .setThumbnail(member.user.displayAvatarURL)
  .setDescription(`${member.user.username}#${member.user.discriminator}`)
  .setColor(client.config.color)
  .addField('Reason', reason)

  let logChannel = msg.guild.channels.get(client.guildSettings.getProp(msg.guild.id, 'logChannel'))
  logChannel.createMessage(embed)
}

exports.help = {
  name: 'unmute',
  description: 'Unmutes a user.',
  usage: 'unmute <@user> <reason>',
  fullDesc: 'Unmutes a user.',
  type: 'mod',
  status: 2
}
