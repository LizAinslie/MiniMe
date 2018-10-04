const dateformat = require('dateformat')
const Logger = require('../util/Logger.js')

module.exports = async (client, role) => {
  client.r.table('serverSettings').get(role.guild.id).run(async (error, settings) => {
    if (error) {
      return Logger.error('Error with event.', error)
    }
    if (!settings) return
    if (!settings.doLogs) return
    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first())

    const logChannel = role.guild.channels.get(settings.logChannel)
    logChannel.createMessage({
      embed: {
        title: 'Role Delete',
        color: client.config.color,
        thumbnail: {
          url: entry.executor.avatarURL
        },
        fields: [
          {
            name: 'Executor:',
            value: entry.executor.username + '#' + entry.executor.discriminator,
            inline: true
          },
          {
            name: 'Role:',
            value: `<@&${role.id}> (ID: ${role.id})`,
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
