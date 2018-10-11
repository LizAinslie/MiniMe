const dateformat = require('dateformat')
const Logger = require('../util/Logger.js')

module.exports = async (client, message) => {
  client.r.table('serverSettings').get(message.channel.guild.id).run(async (error, settings) => {
    if (error) {
      return Logger.error('Error with event.', error)
    }
    if (!settings) return
    if (!settings.doLogs) return
    if (!settings.logChannel) return

    const logChannel = message.channel.guild.channels.get(settings.logChannel)
    logChannel.createMessage({
      embed: {
        title: 'Message Delete',
        color: client.colors.RED,
        timestamp: new Date(),
        thumbnail: {
          url: message.author.avatarURL
        },
        fields: [
          {
            name: 'Message Author:',
            value: message.author.username + '#' + message.author.discriminator,
            inline: true
          },
          {
            name: 'Message ID',
            value: message.id,
            inline: true
          },
          {
            name: 'Channel',
            value: `<#${message.channel.id}>`,
            inline: true
          },
          {
            name: 'Created At',
            value: dateformat(message.createdAt, 'mm/dd/yyyy hh:MM:ss TT'),
            inline: true
          },
          {
            name: 'Message Content',
            value: message.content
          }
        ]
      }
    })
  })
}
