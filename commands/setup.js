const util = require('../util.js')

const filter = a => a === a

exports.run = (client, msg, args) => {
  let owner, mod, helper, welcome, logs
  util.resolveChannel(client, args[0], msg.guild).then(channel => {
    logs = channel.id
  })
  util.resolveChannel(client, args[1], msg.guild).then(channel => {
    welcome = channel.id
  })
  util.resolveRole(client, args[2], msg.guild).then(role => {
    owner = role.name
  })
  util.resolveRole(client, args[3], msg.guild).then(role => {
    mod = role.name
  })
  util.resolveRole(client, args[4], msg.guild).then(role => {
    helper = role.name
  })
  const key = `${msg.guild.id}`
  // Triggers on new users we haven't seen before.
  if (!client.guildSettings.has(key)) {
    // The user and guild properties will help us in filters and leaderboards.
    client.guildSettings.set(key, {
      ownerRole: owner, modRole: mod, helperRole: helper, logChannel: logs, welcomeChannel: welcome
    })
  }
  msg.channel.send('All done! Your server is now all set up!')
}

exports.help = {
  name: 'setup',
  description: 'Sets your server up.',
  usage: 'setup <logChannel> <welcomeChannel> <ownerRole> <modRole> <helperRole>',
  fullDesc: 'Sets your server up for use with advanced features.',
  type: 'util'
}