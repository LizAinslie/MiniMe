const util = require('../util.js')
const dateformat = require('dateformat')

module.exports = async (client, guild, user) => {
  client.r.table('serverSettings').get(guild.id).run(async(error, settings) => {
    if (!settings) return
    if (!settings.doLogs) return
    const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    const logChannel = guild.channels.get(settings.logChannel) 
    logChannel.createMessage({
      embed: {
        title: 'User Ban',
        color: client.colors.RED,
        thumbnail: {
          url: entry.executor.avatarURL
        },
        fields: [
          {
            name: 'User Banned:',
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
