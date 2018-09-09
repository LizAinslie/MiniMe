const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.send(':no_entry_sign: │ You need the permission `MANAGE_ROLES` to use this.')
  let member = msg.mentions.members.first()
  if (!member) return msg.reply('you must mention a valid member of this server!')

  let reason = args.slice(1).join(' ')
  if (!reason) reason = 'No reason provided.'

  member.addRole(client.guildSettings.getProp(msg.guild.id, 'muteRole'))
  msg.channel.send(`Muted ${member.user.username}`)
}

exports.help = {
  name: 'mute',
  description: 'Mutes a user.',
  usage: 'mute <@user> <reason>',
  fullDesc: 'Mutes a user.',
  type: 'mod',
  status: 2
}
