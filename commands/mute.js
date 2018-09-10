/* Eris Fixed */

exports.run = (client, msg, args) => {
  client.r.table('serverSettings').get(msg.channel.guild.id).run((error, settings) => {
    if (!settings) return msg.channel.createMessage('You must set up your server first!')
    if (!msg.member.permission.has('MANAGE_ROLES')) return msg.channel.createMessage(':no_entry_sign: │ You need the permission `MANAGE_ROLES` to use this.')
    let member = msg.mentions[0]
    if (!member) return msg.channel.createMessage('You must mention a valid member of this server!')
  
    let reason = args.slice(1).join(' ')
    if (!reason) reason = 'No reason provided.'
  
    msg.channel.guild.addMemberRole(member.id, settings.muteRole, reason)
    msg.channel.createMessage(`Muted ${member.user.username} - \`${reason}\``)
  })
}

exports.help = {
  name: 'mute',
  description: 'Mutes a user.',
  usage: 'mute <@user> <reason>',
  fullDesc: 'Mutes a user.',
  type: 'mod',
  status: 2
}
