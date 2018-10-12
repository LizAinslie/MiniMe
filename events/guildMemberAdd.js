module.exports = (client, member) => {
	client.r.table('serverSettings').get(member.guild.id).run().then(async settings => {
		if (!settings) return
		if (settings.doAutoRole) {
			if (!settings.autoRole) return

			member.addRole(settings.autoRole).then(() => {
				if(settings.doLogs && settings.logChannel) {
					member.guild.channels.get(settings.logchannel).createMessage({
						embed: {
							title: 'Member Autoroled',
							color: client.colors.CYAN,
							timestamp: new Date(),
							thumbnail: {
								url: member.user.avatarURL
							},
							fields: [
								{
									name: 'Role Given',
									value: `<@&${settings.autoRole}>`,
									inline: true
								},
								{
									name: 'Member',
									value: `<@${member.id}>`,
									inline: true
								}
							]
						}
					})
				}
			}).catch(err => {
				client.rollbar.error('could not add role: ' + err)
			})
		}
	})
}
