const Logger = require('../util/Logger.js')

module.exports = (client, channel) => {
  client.r.table('serverSettings').get(channel.guild.id).run((error, settings) => {
    if (error) {
      return Logger.error('Error with event.', error)
    }
    if (!settings) return
    if (!settings.doLogs) return
    if (!settings.logChannel) return

    const logChannel = channel.guild.channels.get(settings.logChannel)
    logChannel.createMessage({
      embed: {
        title: 'Channel Create',
        color: client.colors.GREEN,
        timestamp: new Date(),
        fields: [
          {
            name: 'Channel Name',
            value: channel.name,
            inline: true
          },
          {
            name: 'Channel Mention',
            value: `<#${channel.id}>`,
            inline: true
          },
          {
            name: 'Channel ID',
            value: channel.id,
            inline: true
          },
          {
            name: 'NSFW',
            value: channel.nsfw ? 'Yes' : 'No',
            inline: true
          }
        ]
      }
    })
  })
}
