module.exports = (client, member, newChannel) => {
    client.r.table('serverSettings').get(member.guild.id).run().then(settings => {
        if (!settings) return
        if (!settings.doLogs) return
        if (!settings.logChannel) return

        member.guild.channels.get(settings.logChannel).createMessage({
            embed: {
                title: 'Voice Channel Joined',
                color: client.colors.GREEN,
                timestamp: new Date(),
                thumbnail: {
                    url: member.user.avatarURL
                },
                fields: [
                    {
                        name: 'Member',
                        value: `<@${member.id}>`,
                        inline: true
                    },
                    {
                        name: 'Channel',
                        value: `<#${newChannel.id}>`,
                        inline: true
                    }
                ]
            }
        })
    })
}
