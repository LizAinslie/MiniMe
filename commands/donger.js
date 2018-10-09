const getEmbedColor = require('../util/getHighestRoleColor.js')
const randomstring = require('randomstring')

exports.run = (client, msg, args) => {
    switch (args.shift()) {
        case 'info':
        case 'view':
            client.r.table('dongers').get(args[0]).run().then(donger => {
                if (!donger) return msg.channel.createMessage(':exclamation: │ That donger is not in the database!')
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
                                value: donger.categories.length ? donger.categories.map(c => c).join(', ') : 'None'
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
            client.r.table('dongers').filter(donger => donger.categories.includes(args.join(' ').toLowerCase()) && donger.verified).run().then(category => {
                msg.channel.createMessage(`__**Dongers in category ${args[0]}:**__\n${category.map(c => `**${c.id}** │ ${c.emote}`).join('\n')}\n\n__**Hint:** Use the bold text on the left to get a specific donger's info.__`)
            })
            break;
        case 'submit':
        case 'create':
        case 'add':
            client.r.table('dongers').getAll(args.join(' '), { index: 'emote' }).run().then(dongers => {
                if (!dongers.length) {
                    const did = randomstring.generate(3)
                    client.r.table('dongers').insert({
                        id: did,
                        emote: args.join(' '),
                        categories: [],
                        verified: false
                    }).run().then(donger => {
                        msg.channel.createMessage(`:white_check_mark: │ Added **${args.join(' ')}** to be reviewed! View it using the id **${did}**.`)
                        client.channels.get('499349902346682370').createMessage({
                            embed: {
                                author: {
                                    icon_url: msg.author.avatarURL,
                                    name: `Donger Submitted!`
                                },
                                color: client.colors.GREEN,
                                footer: {
                                    icon_url: client.user.avatarURL,
                                    text: 'Developer Logging'
                                },
                                thumbnail: {
                                    url: msg.author.avatarURL
                                },
                                timestamp: new Date(),
                                fields: [
                                    {
                                        name: 'User Tag',
                                        value: `${msg.author.username}#${msg.author.discriminator}`,
                                        inline: true
                                    },
                                    {
                                        name: 'User Mention',
                                        value: `<@${msg.author.id}>`,
                                        inline: true
                                    },
                                    {
                                        name: 'Donger',
                                        value: args.join(' '),
                                        inline: true
                                    },
                                    {
                                        name: 'ID',
                                        value: did,
                                        inline: true
                                    }
                                ]
                            }
                        })
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