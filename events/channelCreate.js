const util = require('../util.js')
const config = require('../config.json')
const dateformat = require('dateformat')

module.exports = async (client, channel) => {
  if (!client.guildSettings.has(channel.guild.id)) return
  if (!client.guildSettings.getProp(channel.guild.id, 'doLogs')) return
  const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
  
  util.log(client, channel, {
    embed: {
      title: 'Channel Create',
      color: config.color,
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
}