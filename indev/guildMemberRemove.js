const log = require('../util.js').log
const dateformat = require('dateformat')
const config = require('../config.json')

module.exports = async (client, member) => {
  const entry = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first())
  if (entry.executor === member) {
    let user = entry.executor.username
    log(member, {
      embed: {
        title: 'Member Kick',
        color: config.color,
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
            name: 'User Kicked:',
            value: member.username,
            inline: true
          },
          {
            name: 'Time:',
            value: dateformat(entry.createdTimestamp, 'mm/dd/yyyy hh:MM:ss TT'),
            inline: true
          },
          {
            name: 'reason',
            value: entry.reason,
            inline: true
          }
        ]
      }
    })
  }
}
