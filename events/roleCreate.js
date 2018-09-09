const util = require('../util.js')
const dateformat = require('dateformat')

module.exports = async (client, role) => {
  client.r.table('serverSettings').get(role.guild.id).run(async(error, settings) => {
    if (!settings) return
    if (!settings.doLogs) return
    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
  
    const logChannel = role.guild.channels.get(settings.logChannel)
    logChannel.send({
      embed: {
        title: 'Role Create',
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
