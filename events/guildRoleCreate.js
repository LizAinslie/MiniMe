const Logger = require('../util/Logger.js')
const dateformat = require('dateformat')

module.exports = async (client, guild, role) => {
  client.r.table('serverSettings').get(guild.id).run(async (error, settings) => {
    if (error) {
      return Logger.error('Error with event.', error)
    }
    if (!settings) return
    if (!settings.doLogs) return
    if (!settings.logChannel) return

    const logChannel = guild.channels.get(settings.logChannel)
    logChannel.createMessage({
      embed: {
        title: 'Role Create',
        color: client.colors.GREEN,
        timestamp: new Date(),
        fields: [
          {
            name: 'Role Name',
            value: role.name,
            inline: true
          },
          {
            name: 'Role Mention',
            value: `<@&${role.id}>`,
            inline: true
          },
          {
            name: 'Role ID',
            value: role.id,
            inline: true
          },
          {
            name: 'Hoisted',
            value: role.hoist ? 'Yes' : 'No',
            inline: true
          },
          {
            name: 'Mentionable',
            value: role.mentionable ? 'Yes' : 'No',
            inline: true
          },
          {
            name: 'Managed',
            value: role.managed ? 'Yes' : 'No',
            inline: true
          },
          {
            name: 'Created At',
            value: dateformat(role.createdAt, 'mm/dd/yyyy hh:MM:ss TT'),
            inline: true
          }
        ]
      }
    })
  })
}
