/* Eris Fixed */

const config = require('../config.json')
const resolveChannel = require('../util/resolveChannel.js')
const resolveRole = require('../util/resolveRole.js')
const Logger = require('../util/Logger.js')

exports.run = (client, msg, args) => {
  if (!msg.member.permission.has('MANAGE_GUILD') && msg.author.id !== client.config.ownerID) return msg.channel.createMessage(':no_entry_sign: | You do not have permission to do this!')
  args = args.join(' ').split('|')
  let owner, mod, helper, welcome, logs, mute

  resolveChannel(client, args[0].trim(), msg.channel.guild).then(logChannel => {
    logs = logChannel.id
  })
  
  resolveChannel(client, args[1].trim(), msg.channel.guild).then(welcomeChannel => {
    welcome = welcomeChannel.id
  })
  
  resolveRole(client, args[2].trim(), msg.channel.guild).then(muteRole => {
    mute = muteRole.id
  })
  
  client.r.table('serverSettings').get(msg.channel.guild.id).run((error, settings) => {
			if (error) return Logger.error(client, 'Setup error.', error)
			if (settings) {
				client.r.table('serverSettings').get(msg.guild.id).update({
					logChannel: logs,
					welcomeChannel: welcome,
					muteRole: mute,
					doLogs: true,
					doWelcomes: true
				}).run((error) => {
					if (error) return Logger.error(client, 'Setup error.', error)
          msg.channel.createMessage('All done! Your server is now set up!')
				})
			} else {
				client.r.table('serverSettings').insert({
					id: msg.channel.guild.id,
					logChannel: logs,
					welcomeChannel: welcome,
					muteRole: mute,
					doLogs: true,
					doWelcomes: true
				}).run((error) => {
					if (error) return Logger.error(client, 'Setup error', error)
          msg.channel.createMessage('All done! Your server is now set up!')
				})
			}
		})
}

exports.help = {
  name: 'setup',
  description: 'Sets your server up.',
  usage: 'setup <logChannel> | <welcomeChannel> | <muteRole>',
  fullDesc: 'Sets your server up for use with advanced features. Example: `' + config.prefix + 'setup bot-hell | welcome | muted`',
  type: 'util',
  status: 2
}
