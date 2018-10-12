module.exports = (client, message, oldMessage) => {
    if (!oldMessage) return
    client.r.table('serverSettings').get(message.guild.id).run().then(settings => {
        if (!settings) return
        if (!settings.doLogs) return
        if (!settings.logChannel) return
        
        message.channel.guild.channels.get(settings.logChannel).createMessage({
            embed: {
                title: 'Message Edit',
                color: client.colors.YELLOW,
                timestamp: new Date(),
                thumbnail: {
                    url: message.author.avatarURL
                },
                fields: [
                    {
                        name: 'Message Author',
                        value: `<@${message.author.id}>`,
                        inline: true
                    },
                    {
                        name: 'Channel',
                        value: `<#${message.channel.id}>`,
                        inline: true
                    },
                    {
                        name: 'Old Content',
                        value: `\`\`\`${oldMessage.content}\`\`\``
                    },
                    {
                        name: 'New Content',
                        value: `\`\`\`${message.content}\`\`\``
                    }
                ]
            }
        })
    })
}