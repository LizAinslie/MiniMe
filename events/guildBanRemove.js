const util = require('../util.js')
const dateformat = require('dateformat')

module.exports = async (client, guild, user) => {
  client.r.table('serverSettings').get(guild.id).run(async(error, settings) => {
    if (!settings) return
    if (!settings.doLogs) return
    const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_REMOVE'}).then(audit => audit.entries.first())

    const logChannel = guild.channels.get(settings.logChannel)
    logChannel.createMessage({
      embed: {
        title: 'User Unban',
        color: client.colors.green,
        fields: [
          {
            name: 'User Unbanned:',
            value: `${user.username}#${user.discriminator} (ID: ${user.id})`,
            inline: true
          },
          {
            name: 'Time:',
            value: dateformat(entry.createdTimestamp, 'mm/dd/yy hh:MM:ss TT'),
            inline: true
          }
        ]
      }
    })
  })
}
