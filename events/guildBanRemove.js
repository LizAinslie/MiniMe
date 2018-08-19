const util = require('../util.js')
const dateformat = require('dateformat')

module.exports = (client, guild, user) => {
  if (!client.guildSettings.has(guild.id)) return
  if (!client.guildSettings.getProp(guild.id, 'doLogs')) return
  
  util.log(client, guild.channels.get(client.guildSettings.getProp(guild.id, 'logChannel')), {
    embed: {
      title: 'User Unban',
      color: client.config.color,
      fields: [
        {
          name: 'User Unbanned:',
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
}