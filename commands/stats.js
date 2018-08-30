const { version } = require('discord.js')
const moment = require('moment')
require('moment-duration-format')
const Discord = require('discord.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, message) => {
  const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]')
  const embed = new Discord.RichEmbed().setTitle('Statistics')
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(getEmbedColor(message))
    .addField(':floppy_disk: │ Mem Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField(':clock4: │ Uptime', duration, true)
    .addField(':keyboard: │ Command Count', client.commands.array().length, true)
    .addField(':busts_in_silhouette: │ Users', client.users.size.toLocaleString(), true)
    .addField('<:servers:484062453265858561> │ Servers', client.guilds.size.toLocaleString(), true)
    .addField('<:djs:484062455618863126> │ Discord.js', version, true)
    .addField('<:js:484062454477881344> │ Node', process.version, true)
  message.channel.send({embed})
}

exports.help = {
  name: 'stats',
  description: 'Gives bot stats.',
  usage: 'stats',
  fullDesc: 'Gives bot stats. Includes all version info, usage info, and numerical info.',
  type: 'util',
  status: 2
}
