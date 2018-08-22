const snekfetch = require('snekfetch')
const dateformat = require('dateformat')

exports.resolveUser = (client, query, returnIDOnly = false, preventUsernameSearch = false) => {
	return new Promise((resolve, reject) => {
		if (/^[\w\W]{2,32}#[0-9]{4}$/.test(query) && !preventUsernameSearch) {
			const username = query.match(/^[^#]+/)[0]
			const discrim = query.match(/[0-9]{4}$/)[0]
			const users = client.users.filter((u) => u.username.toLowerCase() === username.toLowerCase() && u.discriminator === discrim)
			if (users.length > 0 && !returnIDOnly) return resolve(users[0])
			if (returnIDOnly) return resolve(users[0].id)
		} else if (/^[0-9]{14,22}$/.test(query)) {
			if (returnIDOnly) return resolve(query)
			const user = client.users.get(query)
			if (user) return resolve(user)
		} else if (/^<@!?[0-9]{14,22}>$/.test(query)) {
			if (returnIDOnly) return resolve(query.match(/[0-9]{14,22}/)[0])
			const user = client.users.get(query.match(/[0-9]{14,22}/)[0])
			if (user) return resolve(user)
		} else if (!preventUsernameSearch) {
			const users = client.users.filter((u) => u.username.toLowerCase().includes(query.toLowerCase()))
			if (users.length > 0 && !returnIDOnly) return resolve(users[0])
      if (returnIDOnly) return resolve(users[0].id)
		}
		reject(new Error())
	})
}

exports.log = (client, entity, info) => {
  let logs = entity.guild.channels.get(client.guildSettings.getProp(entity.guild.id, 'logChannel'))
  logs.send(info).catch(err => {
    console.debug("I didn't have the permissions to log something to the #logs channel.")
  })
}

const formatSize = (bytes) => {
  const kb = bytes / 1024
	const mb = kb / 1024
	const gb = mb / 1024
	if (kb < 1024) return kb.toFixed(1).toLocaleString() + ' KB'
	if (kb > 1024 && mb < 1024) return mb.toFixed(1).toLocaleString() + ' MB'
	return gb.toFixed(1).toLocaleString() + ' GB'
}

exports.formatSize = formatSize

exports.formatArbitrary = (data) => {
	data = data.replace(new RegExp(process.env.DISCORD_TOKEN, 'g'), '-- SENSITIVE INFORMATION --')
	return data
}

exports.uploadToHastebin = (message) => {
	return new Promise((resolve, reject) => {
		snekfetch.post('https://h.mayo.pw/documents').send('// ' + dateformat(Date.now(), 'mm/dd/yyyy hh:MM:ss TT') + '\n// ' + message.length + ' characters\n// ' + formatSize(message.length) + '\n\n' + message).then((result) => {
			resolve('https://h.mayo.pw/' + result.body.key + '.js')
		}).catch((error) => {
			reject(error)
		})
	})
}

exports.get = (id, channel, client) => {
	if (!channel.id) channel = client.channels.get(channel)
	if (!channel || channel.type !== 'text' || !channel.permissionsFor(channel.guild.me).has('VIEW_CHANNEL')) return Promise.resolve()

	return channel.messages.has(id)
		? Promise.resolve(channel.messages.get(id))
		: channel.messages.fetch(id)
}

exports.stripTrailingZero = (temperature) => {
	if (temperature % 1 === 0) return Math.trunc(temperature)
	return temperature.toFixed(1)
}

exports.resolveChannel = (bot, query, guild) => {
	return new Promise((resolve, reject) => {
		if (/^\d+$/.test(query)) {
			if (guild) {
				if (!guild.channels.has(query)) reject()
				resolve(guild.channels.get(query))
			} else {
				const channel = query in bot.channelGuildMap && bot.guilds.get(bot.channelGuildMap[query]).channels.get(query)
				if (channel) return resolve(channel)
			}
		} else if (/^<#(\d+)>$/.test(query)) {
			const match = query.match(/^<#(\d+)>$/)
			if (guild) {
				if (!guild.channels.has(match[1])) reject()
				resolve(guild.channels.get(match[1]))
			} else {
				const channel = match[1] in bot.channelGuildMap && bot.guilds.get(bot.channelGuildMap[match[1]]).channels.get(match[1])
				if (channel) return resolve(channel)
			}
		} else if (guild) {
			const channels = guild.channels.filter((channel) => channel.name.toLowerCase().includes(query.toLowerCase()))
			if (channels.length > 0) return resolve(channels[0])
		}
		reject()
	})
}

exports.resolveRole = (bot, query, guild) => {
	return new Promise((resolve, reject) => {
		if (/^\d+$/.test(query)) {
			const role = guild.roles.get(query)
			if (role) return resolve(role)
		} else if (/^<@&(\d+)>$/.test(query)) {
			const match = query.match(/^<@&(\d+)>$/)
			const role = guild.roles.get(match[1])
			if (role) return resolve(role)
		} else {
			const roles = guild.roles.filter((role) => role.name.toLowerCase().includes(query.toLowerCase()))
			if (roles.length > 0) return resolve(roles[0])
		}
		reject()
	})
}
