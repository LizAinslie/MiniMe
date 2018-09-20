const snekfetch = require('snekfetch')

module.exports = async (client, member) => {
	client.r.table('serverSettings').get(member.guild.id).run().then(settings => {
		if (!settings) return
		if (!settings.doWelcomes) return
		
		const { body: buffer } = await snekfetch.get(`https://api.railrunner16.me/api/gen/welcome/${member.guild.memberCount}/${member.user.username}/${member.user.id}/${member.avatar | member.defaultAvatar}`)
		
		const channel = member.guild.channels.get(settings.welcomeChannel)
		channel.createMessage(`Welcome to the server, ${member.user.username}#${member.user.discriminator}!`, { file: buffer, name: 'welcome.png' })
	})
}
