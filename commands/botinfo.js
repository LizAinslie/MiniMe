const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg) => {
    msg.channel.createMessage({
        embed: {
            title: 'Mini Me Bot Info',
            color: getEmbedColor(client, msg),
            description: 'Mini Me is a powerful multipurpose bot for your server. Its features include everything from Moderation to Image Manipulation.',
            fields: [
                {
                    name: 'Tag',
                    value: `${client.user.username}#${client.user.discriminator}`,
                    inline: true
                },
                {
                    name: 'ID',
                    value: client.user.id,
                    inline: true
                },
                {
                    name: 'Links',
                    value: `[Support Server](${client.config.links.supportServer}) │ [Git](${client.config.links.git}) │ [Website](${client.config.links.website}) │ [Bot Invite](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`
                }
            ]
        }
    })
}

exports.help = {
  name: 'botinfo',
  description: 'Get info about the bot.',
  usage: 'botinfo',
  fullDesc: 'Get info about the bot.',
  type: 'util',
  status: 2,
  aliases: []
}
