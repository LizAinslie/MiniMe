const { version } = require('eris')
const moment = require('moment')
require('moment-duration-format')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, message) => {
  const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]')
  message.channel.createMessage({
    embed: {
      title: 'Stats',
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      color: getEmbedColor(client, message),
      fields: [
        {
          name: ':floppy_disk: │ Mem Usage',
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
          inline: true
        },
        {
          name: ':clock4: │ Uptime',
          value: duration,
          inline: true
        },
        {
          name: ':keyboard: │ Command Count',
          value: client.commands.array(),
          inline: true
        },
        {
          name: ':busts_in_silhouette: │ Users',
          value: client.users.size.toLocaleString(),
          inline: true
        },
        {
          name: '<:servers:484062453265858561> │ Servers',
          value: client.guilds.size.toLocaleString(),
          inline: true
        },
        {
          name: '<:djs:484062455618863126> │ Discord.js',
          value: version,
          inline: true
        },
        {
          name: '<:js:484062454477881344> │ Node',
          value: process.version,
          inline: true
        }
      ]
    }
  })
}

exports.help = {
  name: 'stats',
  description: 'Gives bot stats.',
  usage: 'stats',
  fullDesc: 'Gives bot stats. Includes all version info, usage info, and numerical info.',
  type: 'util',
  status: 2
}
