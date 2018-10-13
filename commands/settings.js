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
										autoRole: null,
										muteRole: null,
										doLogs: false,
										doWelcomes: false,
										doAutoRole: false
									}).run((error) => {
										if (error) return Logger.error(client, 'Setup error', error)
										msg.channel.createMessage('Set the **Logging Channel** option successfully!')
									})
								}
							})
						})
						break
					case 'welcomechannel':
						resolveChannel(client, args[0].trim(), msg.channel.guild).then(welcomeChannel => {
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
										autoRole: null,
										muteRole: null,
										doLogs: false,
										doWelcomes: false,
										doAutoRole: false
									}).run((error) => {
										if (error) return Logger.error(client, 'Setup error', error)
										msg.channel.createMessage('Set the **Welcome Channel** option successfully!')
									})
								}
							})
						})
						break
					case 'muterole':
						resolveRole(client, args[0].trim(), msg.channel.guild).then(muteRole => {
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
										autoRole: null,
										muteRole: muteRole.id,
										doLogs: false,
										doWelcomes: false,
										doAutoRole: false
									}).run((error) => {
										if (error) return Logger.error(client, 'Setup error', error)
										msg.channel.createMessage('Set the **Mute Role** option successfully!')
									})
								}
							})
						})
						break
					case 'autorole':
						resolveRole(client, args[0].trim(), msg.channel.guild).then(autoRole => {
							client.r.table('serverSettings').get(msg.channel.guild.id).run((error, settings) => {
								if (error) return Logger.error(client, 'Setup error.', error)
								if (settings) {
									client.r.table('serverSettings').get(msg.guild.id).update({
										autoRole: autoRole.id
									}).run((error) => {
										if (error) return Logger.error(client, 'Setup error.', error)
										msg.channel.createMessage('Set the **Auto Role** option successfully!')
									})
								} else {
									client.r.table('serverSettings').insert({
										id: msg.channel.guild.id,
										logChannel: null,
										welcomeChannel: null,
										muteRole: null,
										autoRole: autoRole.id,
										doLogs: false,
										doWelcomes: false,
										doAutoRole: false
									}).run((error) => {
										if (error) return Logger.error(client, 'Setup error', error)
										msg.channel.createMessage('Set the **Auto Role** option successfully!')
									})
								}
							})
						})
						break
				}
				break
			case 'options':
				switch (args.shift().toLowerCase()) {
					case 'dowelcomes':
						let welcomes = Boolean(parseInt(args[0].trim(), 10))
						client.r.table('serverSettings').get(msg.channel.guild.id).run((error, settings) => {
							if (error) return Logger.error(client, 'Setup error.', error)
							if (settings) {
								client.r.table('serverSettings').get(msg.guild.id).update({
									doWelcomes: welcomes
								}).run((error) => {
									if (error) return Logger.error(client, 'Setup error.', error)
									msg.channel.createMessage({
										embed: {
											title: 'Server Options Updated',
											color: getEmbedColor(client, msg),
											fields: [
												{
													name: 'Value Changed',
													value: 'Welcomes',
													inline: true
												},
												{
													name: 'Changed to',
													value: welcomes.toString(),
													inline: true
												}
											]
										}
									})
								})
							} else {
								client.r.table('serverSettings').insert({
									id: msg.channel.guild.id,
									logChannel: null,
									welcomeChannel: null,
									autoRole: null,
									muteRole: null,
									doLogs: false,
									doWelcomes: welcomes,
									doAutoRole: false
								}).run((error) => {
									if (error) return Logger.error(client, 'Setup error', error)
									msg.channel.createMessage({
										embed: {
											title: 'Server Options Updated',
											color: getEmbedColor(client, msg),
											fields: [
												{
													name: 'Value Changed',
													value: 'Welcomes',
													inline: true
												},
												{
													name: 'Changed to',
													value: welcomes.toString(),
													inline: true
												}
											]
										}
									})
								})
							}
						})
						break
					case 'dologs':
						let logs = Boolean(parseInt(args[0].trim(), 10))
						client.r.table('serverSettings').get(msg.channel.guild.id).run((error, settings) => {
							if (error) return Logger.error(client, 'Setup error.', error)
							if (settings) {
								client.r.table('serverSettings').get(msg.guild.id).update({
									doLogs: logs
								}).run((error) => {
									if (error) return Logger.error(client, 'Setup error.', error)
									msg.channel.createMessage({
										embed: {
											title: 'Server Options Updated',
											color: getEmbedColor(client, msg),
											fields: [
												{
													name: 'Value Changed',
													value: 'Logs',
													inline: true
												},
												{
													name: 'Changed to',
													value: logs.toString(),
													inline: true
												}
											]
										}
									})
								})
							} else {
								client.r.table('serverSettings').insert({
									id: msg.channel.guild.id,
									logChannel: null,
									welcomeChannel: null,
									autoRole: null,
									muteRole: null,
									doLogs: logs,
									doWelcomes: false,
									doAutoRole: false
								}).run((error) => {
									if (error) return Logger.error(client, 'Setup error', error)
									msg.channel.createMessage({
										embed: {
											title: 'Server Options Updated',
											color: getEmbedColor(client, msg),
											fields: [
												{
													name: 'Value Changed',
													value: 'Logs',
													inline: true
												},
												{
													name: 'Changed to',
													value: logs.toString(),
													inline: true
												}
											]
										}
									})
								})
							}
						})
						break
					case 'doautorole':
						let autoRole = Boolean(parseInt(args[0].trim(), 10))
						client.r.table('serverSettings').get(msg.channel.guild.id).run((error, settings) => {
							if (error) return Logger.error(client, 'Setup error.', error)
							if (settings) {
								client.r.table('serverSettings').get(msg.guild.id).update({
									doAutoRole: autoRole
								}).run((error) => {
									if (error) return Logger.error(client, 'Setup error.', error)
									msg.channel.createMessage({
										embed: {
											title: 'Server Options Updated',
											color: getEmbedColor(client, msg),
											fields: [
												{
													name: 'Value Changed',
													value: 'Auto-Role',
													inline: true
												},
												{
													name: 'Changed to',
													value: autoRole.toString(),
													inline: true
												}
											]
										}
									})
								})
							} else {
								client.r.table('serverSettings').insert({
									id: msg.channel.guild.id,
									logChannel: null,
									welcomeChannel: null,
									autoRole: null,
									muteRole: null,
									doLogs: false,
									doWelcomes: false,
									doAutoRole: autoRole
								}).run((error) => {
									if (error) return Logger.error(client, 'Setup error', error)
									msg.channel.createMessage({
										embed: {
											title: 'Server Options Updated',
											color: getEmbedColor(client, msg),
											fields: [
												{
													name: 'Value Changed',
													value: 'Auto-Role',
													inline: true
												},
												{
													name: 'Changed to',
													value: autoRole.toString(),
													inline: true
												}
											]
										}
									})
								})
							}
						})
						break
					default:
						msg.channel.createMessage(':interrobang: │ You need to specify either `logs` or `welcomes` as a value to change!')
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
								value: '**Usage:** `settings set <muterole|logchannel|welcomechannel> <value>`'
							},
							{
								name: 'Options',
								value: '**Usage:** `settings options <dologs|dowelcomes|doautorole> <0|1>` (**0** = **false**, **1** = **true**)'
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
