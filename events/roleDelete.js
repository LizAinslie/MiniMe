const dateformat = require('dateformat')
const Logger = require('../util/Logger.js')

module.exports = async (client, role) => {
  client.r.table('serverSettings').get(role.guild.id).run(async (error, settings) => {
    if (error) {
      return Logger.error('Error with event.', error)
    }
    if (!settings) return
    if (!settings.doLogs) return
    if (!settings.logChannel) return

    const logChannel = role.guild.channels.get(settings.logChannel)
    logChannel.createMessage({
      embed: {
        title: 'Role Delete',
        color: client.colors.RED,
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
