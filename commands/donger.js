const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
    switch (args.shift()) {
        case 'info':
            client.r.table('dongers').get(args.join(' ').toLowerCase()).run().then(donger => {
                if (!donger) return msg.channel.createMessage(':exclamation: │ That donger is not in the database! Join the support server to suggest it!')
                msg.channel.createMessage({
                    embed: {
                        title: donger.id,
                        color: getEmbedColor(client, msg),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: 'Status: 200'
                        },
                        timestamp: new Date(),
                        fields: [
                            {
                                name: 'Donger',
                                value: donger.id
                            },
                            {
                                name: 'Category',
                                value: donger.category
                            }
                        ]
                    }
                })
            })
            break;
        case 'list':
            client.r.table('dongers').filter({ category: args.join(' ').toLowerCase() }).run().then(category => {
                msg.channel.createMessage(`**Dongers in category ${args[0]}:**\n${category.map(c => `${c.id}\n`)}`)
            })
    }
}

exports.help = {
  name: 'donger',
  description: 'Access dongers in Discord!',
  usage: 'donger <list <category>|info <donger>>',
  fullDesc: 'Access dongers in Discord!',
  type: 'util',
  status: 2,
  aliases: []
}