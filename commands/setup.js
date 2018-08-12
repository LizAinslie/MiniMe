const util = require('../util.js')
const config = require('../config.json')

exports.run = (client, msg, args) => {
  if (client.guildSettings.has(msg.guild.id) && !msg.member.roles.some(r => [client.guildSettings.getProp(msg.guild.id, 'ownerRole')])) return msg.channel.send(':no_entry_sign: | You do not have permission to do this!')
  args = args.join(' ').split('|')
  let owner, mod, helper, welcome, logs, mute
  
  logs = msg.guild.channels.find('name', args[0].trim()).id || msg.guild.channels.get(args[0]).id || msg.mentions.channels.array()[0].id
  
  welcome = msg.guild.channels.find('name', args[1].trim()).id || msg.guild.channels.get(args[1]).id || msg.mentions.channels.array()[1].id
  
  owner = msg.guild.roles.find('name', args[2].trim()).name || msg.guild.roles.get(args[2]).name || msg.mentions.roles.array()[0].name
  
  mod = msg.guild.roles.find("name", args[3].trim()).name || msg.guild.roles.get(args[3]).name || msg.mentions.roles.array()[1].name
  
  helper = msg.guild.roles.find('name', args[4].trim()).name || msg.guild.roles.get(args[4]).name || msg.mentions.roles.array()[2].name
  
  mute = msg.guild.roles.find('name', args[5].trim()).id || msg.guild.roles.get(args[5]).id || msg.mentions.roles.array()[3].id

  const key = `${msg.guild.id}`
    // The user and guild properties will help us in filters and leaderboards.
  client.guildSettings.set(key, {
    ownerRole: owner, modRole: mod, helperRole: helper, muteRole: mute, logChannel: logs, welcomeChannel: welcome, doLogs: true, doWelcomes: true
  })
  msg.channel.send('All done! Your server is now all set up!')
}

exports.help = {
  name: 'setup',
  description: 'Sets your server up.',
  usage: 'setup <logChannel> | <welcomeChannel> | <ownerRole> | <modRole> | <helperRole> | <muteRole>',
  fullDesc: 'Sets your server up for use with advanced features. Example: `' + config.prefix + 'setup bot-hell | welcome | Owner | Admin | Web Mod | muted`',
  type: 'util'
}