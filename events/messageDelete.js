const dateformat = require('dateformat')
const util = require('../util.js')

module.exports = async (client, message) => {
  if (!client.guildSettings.has(message.guild.id)) return
  if (!client.guildSettings.getProp(message.guild.id, 'doLogs')) return
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())

  // Define an empty user for now. This will be used later in the guide.
  let user = ''
  if (entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id)) {
    user = entry.executor.username
  } else {
    user = message.author.username
  }
  util.log(client, message, {
    embed: {
      title: 'Message Delete',
      color: client.config.color,
      thumbnail: {
        url: entry.executor.avatarURL
      },
      fields: [
        {
          name: 'Executor:',
          value: user,
          inline: true
        },
        {
          name: 'Message Author:',
          value: message.author.username + '#' + message.author.discriminator,
          inline: true
        },
        {
          name: 'Message Channel:',
          value: message.channel.toString(),
          inline: true
        },
        {
          name: 'Message ID',
          value: message.id,
          inline: true
        },
        {
          name: 'Time:',
          value: dateformat(entry.createdTimestamp, 'mm/dd/yyyy hh:MM:ss TT'),
          inline: true
        }
      ]
    }
  })
}
