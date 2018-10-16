module.exports = async (client, user, oldUser) => {
    if (!oldUser) return
    let guilds = client.guilds.filter(g => g.members.has(user.id))
    if (oldUser.username != user.username || oldUser.discriminator != user.discriminator) {
        for (let guild of guilds) {
            client.r.table('serverSettings').get(guild.id).run().then(settings => {
                if (!settings) return
                if (!settings.doLogs) return
                if (!settings.logChannel) return

                guild.channels.get(settings.logChannel).createMessage({
                    embed: {
                        title: 'Username Update',
                        color: client.colors.YELLOW,
                        thumbnail: {
                            url: user.avatarURL
                        },
                        timestamp: new Date(),
                        fields: [
                            {
                                name: 'Old Tag',
                                value: `${oldUser.username}#${oldUser.discriminator}`
                            },
                            {
                                name: 'New Tag',
                                value: `${user.username}#${user.discriminator}`
                            }
                        ]
                    }
                })
            })
        }
    }
}
