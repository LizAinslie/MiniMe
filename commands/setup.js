const config = require('../config.json')
const resolveChannel = require('../util/resolveChannel.js')
const resolveRole = require('../util/resolveRole.js')
const Logger = require('../util/Logger.js')

exports.run = (client, msg, args) => {
  if (client.guildSettings.has(msg.guild.id) && !msg.member.roles.some(r => [client.guildSettings.getProp(msg.guild.id, 'ownerRole')])) return msg.channel.send(':no_entry_sign: | You do not have permission to do this!')
  args = args.join(' ').split('|')
  let owner, mod, helper, welcome, logs, mute

  resolveChannel(client, args[0].trim(), msg.guild).then(logChannel => {
    logs = logChannel.id
  })
  
  resolveChannel(client, args[1].trim(), msg.guild).then(welcomeChannel => {
    welcome = welcomeChannel.id
  })
  
  resolveRole(client, args[2].trim(), msg.guild).then(ownerRole => {
    owner = ownerRole.name
  })
  
  resolveRole(client, args[3].trim(), msg.guild).then(modRole => {
    mod = modRole.name
  })
  
  resolveRole(client, args[4].trim(), msg.guild).then(helperRole => {
    helper = helperRole.name
  })
  
  resolveRole(client, args[5].trim(), msg.guild).then(muteRole => {
    mute = muteRole.id
  })
  
  client.r.table('serverSettings').get(msg.guild.id).run((error, settings) => {
			if (error) return Logger.error(client, 'Setup error.', error)
			if (settings) {
				client.r.table('serverSettings').get().update({
					logChannel: logs,
					welcomeChannel: welcome,
					ownerRole: owner,
					modRole: mod,
					helperRole: helper,
					muteRole: mute,
					doLogs: true,
					doWelcomes: true
				}).run((error) => {
					if (error) return Logger.error(client, 'Setup error.', error)
          msg.channel.send('All done! Your server is now set up!')
				})
			} else {
				client.r.table('serverSettings').insert({
					id: msg.guild.id,
					logChannel: logs,
					welcomeChannel: welcome,
					ownerRole: owner,
					modRole: mod,
					helperRole: helper,
					muteRole: mute,
					doLogs: true,
					doWelcomes: true
				}).run((error) => {
					if (error) return Logger.error(client, 'Setup error', error)
          msg.channel.send('All done! Your server is now set up!')
				})
			}
		})
}

exports.help = {
  name: 'setup',
  description: 'Sets your server up.',
  usage: 'setup <logChannel> | <welcomeChannel> | <ownerRole> | <modRole> | <helperRole> | <muteRole>',
  fullDesc: 'Sets your server up for use with advanced features. Example: `' + config.prefix + 'setup bot-hell | welcome | Owner | Admin | Web Mod | muted`',
  type: 'util',
  status: 2
}
