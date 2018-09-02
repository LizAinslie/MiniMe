const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.send(':no_entry_sign: │ You need the permission `MANAGE_ROLES` to use this.')
  let member = msg.mentions.members.first()
  if (!member) return msg.reply('you must mention a valid member of this server!')

  let reason = args.slice(1).join(' ')
  if (!reason) reason = 'No reason provided.'

  member.addRole(client.guildSettings.getProp(msg.guild.id, 'muteRole'))
  const embed = new Discord.RichEmbed()
  .setTitle('User Mute')
  .setThumbnail(member.user.displayAvatarURL)
  .setDescription(`${member.user.username}#${member.user.discriminator}`)
  .setColor(client.config.color)
  .addField('Reason', reason)
  
  let logChannel = msg.guild.channels.get(client.guildSettings.getProp(msg.guild.id, 'logChannel'))
  logChannel.send(embed)
}

exports.help = {
  name: 'mute',
  description: 'Mutes a user.',
  usage: 'mute <@user> <reason>',
  fullDesc: 'Mutes a user.',
  type: 'mod',
  status: 2
}
