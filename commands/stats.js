const { version } = require('discord.js')
const moment = require('moment')
require('moment-duration-format')
const Discord = require('discord.js')
const config = require('../config.json')

exports.run = (client, message) => {
  const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]')
  const embed = new Discord.RichEmbed().setTitle('Statistics')
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription('')
    .setColor(config.color)
    .addField('Mem Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField('Uptime', duration, true)
    .addField('Command Count', client.commands.array().length, true)
    .addField('Users', client.users.size.toLocaleString(), true)
    .addField('Servers', client.guilds.size.toLocaleString(), true)
    .addField('Channels', client.channels.size.toLocaleString(), true)
    .addField('Discord.js', version, true)
    .addField('Node', process.version, true)
  message.channel.send({embed})
}

exports.help = {
  name: 'stats',
  description: 'Gives bot stats.',
  usage: 'stats',
  fullDesc: 'Gives bot stats. Includes all version info, usage info, and numerical info.',
  type: 'util'
}
