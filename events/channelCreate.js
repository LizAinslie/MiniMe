const dateformat = require('dateformat')
const Logger = require('../util/Logger.js')

module.exports = async (client, channel) => {
  client.r.table('serverSettings').get(channel.guild.id).run(async (error, settings) => {
    if (error) {
      return Logger.error('Error with event.', error)
    }
    if (!settings) return
    if (!settings.doLogs) return
    const entry = await channel.guild.getAuditLogs(1, 10).entries[0]

    const logChannel = channel.guild.channels.get(settings.logChannel)
    logChannel.createMessage({
      embed: {
        title: 'Channel Create',
        color: client.colors.GREEN,
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
            name: 'Channel:',
            value: `${channel}`,
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
