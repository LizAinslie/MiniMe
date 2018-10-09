const getEmbedColor = require('../util/getHighestRoleColor.js')
const randomstring = require('randomstring')

exports.run = (client, msg, args) => {
    switch (args.shift()) {
        case 'info':
        case 'view':
            client.r.table('dongers').get(args[0]).run().then(donger => {
                if (!donger) return msg.channel.createMessage(':exclamation: │ That donger is not in the database! Join the support server to suggest it!')
                msg.channel.createMessage({
                    embed: {
                        title: `Donger ${donger.id}`,
                        color: getEmbedColor(client, msg),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: 'Status: 200'
                        },
                        timestamp: new Date(),
                        fields: [
                            {
                                name: 'Donger',
                                value: donger.emote
                            },
                            {
                                name: 'Categories',
                                value: donger.categories.map(c => c).join(', ')
                            },
                            {
                                name: 'Verified',
                                value: donger.verified ? 'Yes' : 'No'
                            }
                        ]
                    }
                })
            })
            break;
        case 'category':
        case 'cat':
            client.r.table('dongers').filter(donger => {
                return donger('categories').contains(args.join(' ').toLowerCase()) && donger('verified').eq(true)
            }).run().then(category => {
                msg.channel.createMessage(`**Dongers in category ${args[0]}:**\n${category.map(c => `**${c.id}** │ ${c.emote}`).join('\n')}\n\n __**Hint:** Use the bold text on the left to get a specific donger's info.__`)
            })
            break;
        case 'submit':
        case 'create':
        case 'add':
            client.r.table('dongers').getAll(args.join(' '), { index: 'emote' }).run().then(dongers => {
                if (!dongers.length) {
                    client.r.table('dongers').insert({
                        id: randomstring.generate(3),
                        emote: args.join(' '),
                        categories: [],
                        verified: false
                    }).run().then(donger => {
                        msg.channel.createMessage(`:white_check_mark: │ Added **${args.join(' ')}** to be reviewed!`)
                    })
                } else {
                    msg.channel.createMessage(':exclamation: │ That donger already exists!')
                }
            })
            break;
    }
}

exports.help = {
  name: 'donger',
  description: 'Access dongers in Discord!',
  usage: 'donger <cat <category>|info <dongerID>|submit <donger>>',
  fullDesc: 'Access dongers in Discord!',
  type: 'util',
  status: 2,
  aliases: []
}