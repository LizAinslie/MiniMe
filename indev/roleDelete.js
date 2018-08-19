const util = require('../util.js')
const dateformat = require('dateformat')

module.exports = async (client, role) => {
  if (!client.guildSettings.has(role.guild.id)) return
  if (!client.guildSettings.getProp(role.guild.id, 'doLogs')) return
  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first())
  
  util.log(client, role.guild.channels.get(client.guildSettings.getProp(role.guild.id, 'logChannel')), {
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
}