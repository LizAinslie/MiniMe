module.exports = (client, guild, member, oldMember) => {
    client.r.table('serverSettings').get(guild.id).run().then(settings => {
        if (!settings) return
        if (!settings.doLogs) return
        if (!settings.logChannel) return

        if (member.nick !== oldMember.nick) {
            guild.channels.get(settings.logChannel).createMessage({
                embed: {
                    title: 'Member Nickname Changed',
                    color: client.colors.YELLOW,
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
                            name: 'Old Nick',
                            value: oldMember.nick ? oldMember.nick : 'None',
                            inline: true
                        },
                        {
                            name: 'New Nick',
                            value: member.nick ? member.nick : 'None',
                            inline: true
                        }
                    ]
                }
            })
        }
        if (member.roles !== oldMember.roles) {
            const rolesAdded = member.roles.filter(r => !oldMember.roles.has(r))
            const rolesRemoved = oldMember.roles.filter(r => !member.roles.has(r))
            const role = rolesAdded.length ? rolesAdded[0] : rolesRemoved[0]
            guild.channels.get(settings.logChannel).createMessage({
                embed: {
                    title: 'Member Roles Updated',
                    color: client.colors.YELLOW,
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
                            name: `Role ${rolesAdded.length ? 'Added' : 'Removed'}`,
                            value: `<@&${role}>`,
                            inline: true
                        }
                    ]
                }
            })
        }
    })
}
