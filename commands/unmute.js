const handleDatabaseError = require('../util/handleDatabaseError.js')
const resolveMember = require('../util/resolveMember.js')

exports.run = (client, msg, args) => {
  client.r.table('serverSettings').get(msg.channel.guild.id).run(async (error, settings) => {
    if (error) return handleDatabaseError(client, error, msg)
    if (!settings) return msg.channel.createMessage('You must set up your server first!')
    if (!settings.muteRole) return msg.channel.createMessage('Yoiu must set a muted role!')
    if (!msg.member.permission.has('manageRoles')) return msg.channel.createMessage(':no_entry_sign: │ You need the permission `MANAGE_ROLES` to use this.')
    let member = await resolveMember(client, args[0], msg.channel.guild)
    if (!member) return msg.channel.createMessage('You must mention a valid member of this server!')

    msg.channel.guild.removeMemberRole(member.id, settings.muteRole)
    msg.channel.createMessage(`Unmuted ${member.username}`)
    if (settings && settings.doLogs && settings.logChannel) {
      msg.channel.guild.channels.get(settings.logChannel).createMessage({
        embed: {
          title: 'Member Unmute',
          color: client.colors.GREEN,
          thumbnail: {
            url: msg.author.avatarURL
          },
          fields: [
            {
              name: 'Member',
              value: `<@${member.id}> (${member.username}#${member.discriminator})`,
              inline: true
            },
            {
              name: 'Responsible Moderator',
              value: `<@${msg.author.id}> (${msg.author.username}#${msg.author.discriminator})`,
              inline: true
            }
          ]
        }
      })
    }
  }).catch(err => {
    handleDatabaseError(client, err, msg)
  })
}

exports.help = {
  name: 'unmute',
  description: 'Unmutes a user.',
  usage: 'unmute <@user> <reason>',
  fullDesc: 'Unmutes a user.',
  type: 'mod',
  status: 2,
  aliases: []
}
