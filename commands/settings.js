const resolveChannel = require('../util/resolveChannel.js')
const resolveRole = require('../util/resolveRole.js')
const Logger = require('../util/Logger.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
	client.r.table('users').get(msg.author.id).run().then(user => {
		if (!msg.member.permission.has('MANAGE_GUILD') && !user.developer) return msg.channel.createMessage(':no_entry_sign: | You do not have permission to do this!')
		switch (args.shift().toLowerCase()) {
			case 'set':
				switch (args.shift().toLowerCase()) {
					case 'logchannel':
						resolveChannel(client, args[0].trim(), msg.channel.guild).then(logChannel => {
							client.r.table('serverSettings').get(msg.channel.guild.id).run((error, settings) => {
								if (error) return Logger.error(client, 'Setup error.', error)
								if (settings) {
									client.r.table('serverSettings').get(msg.guild.id).update({
										logChannel: logChannel.id
									}).run((error) => {
										if (error) return Logger.error(client, 'Setup error.', error)
										msg.channel.createMessage('Set the **Logging Channel** option successfully!')
									})
								} else {
									client.r.table('serverSettings').insert({
										id: msg.channel.guild.id,
										logChannel: logChannel.id,
										welcomeChannel: null,
										muteRole: null,
										doLogs: false,
										doWelcomes: false
									}).run((error) => {
										if (error) return Logger.error(client, 'Setup error', error)
										msg.channel.createMessage('Set the **Logging Channel** option successfully!')
									})
								}
							})
						})
						break
					case 'welcomechannel':
						resolveChannel(client, args[1].trim(), msg.channel.guild).then(welcomeChannel => {
							client.r.table('serverSettings').get(msg.channel.guild.id).run((error, settings) => {
								if (error) return Logger.error(client, 'Setup error.', error)
								if (settings) {
									client.r.table('serverSettings').get(msg.guild.id).update({
										welcomeChannel: welcomeChannel.id
									}).run((error) => {
										if (error) return Logger.error(client, 'Setup error.', error)
										msg.channel.createMessage('Set the **Welcome Channel** option successfully!')
									})
								} else {
									client.r.table('serverSettings').insert({
										id: msg.channel.guild.id,
										logChannel: null,
										welcomeChannel: welcomeChannel.id,
										muteRole: null,
										doLogs: false,
										doWelcomes: false
									}).run((error) => {
										if (error) return Logger.error(client, 'Setup error', error)
										msg.channel.createMessage('Set the **Welcome Channel** option successfully!')
									})
								}
							})
						})
						break
					case 'muterole':
						resolveRole(client, args[2].trim(), msg.channel.guild).then(muteRole => {
							client.r.table('serverSettings').get(msg.channel.guild.id).run((error, settings) => {
								if (error) return Logger.error(client, 'Setup error.', error)
								if (settings) {
									client.r.table('serverSettings').get(msg.guild.id).update({
										muteRole: muteRole.id
									}).run((error) => {
										if (error) return Logger.error(client, 'Setup error.', error)
										msg.channel.createMessage('Set the **Mute Role** option successfully!')
									})
								} else {
									client.r.table('serverSettings').insert({
										id: msg.channel.guild.id,
										logChannel: null,
										welcomeChannel: null,
										muteRole: muteRole.id,
										doLogs: false,
										doWelcomes: false
									}).run((error) => {
										if (error) return Logger.error(client, 'Setup error', error)
										msg.channel.createMessage('Set the **Mute Role** option successfully!')
									})
								}
							})
						})
						break
				}
				break
			 case 'help':
				msg.channel.createMessage({
					embed: {
						title: 'Settings Help',
						color: getEmbedColor(client, msg),
						fields: [
							{
								name: 'Set',
								value: '**Usage:** `profile set <muterole|logchannel|welcomechannel> <value>`'
							}
						],
						timestamp: new Date(),
						footer: {
							text: 'Status: 200',
							icon_url: client.user.avatarURL
						}
					}
				})
				break
		}
	})
}

exports.help = {
  name: 'settings',
  description: 'Manage your server settings.',
  usage: 'settings help',
  fullDesc: 'Manage your server settings.',
  type: 'mod',
  status: 2,
  aliases: []
}
