const resolveUser = require('../util/resolveUser.js')
const Logger = require('../util/Logger.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
    switch (args.shift().toLowerCase()) {
        case 'view':
            if (args[0]) {
                resolveUser(client, args.join(' ')).then(user => {
                    client.r.table('users').get(user.id).run((error, profile) => {
                        if (!profile) return msg.channel.createMessage(':exclamation: │ That user has no profile!')
                        client.r.table('balance').get(user.id).run().then(balance => {
                            msg.channel.createMessage({
                                embed: {
                                    author: {
                                        name: `${user.username}#${user.discriminator}'s Profile`,
                                        icon_url: user.avatarURL
                                    },
                                    color: getEmbedColor(client, msg),
                                    description: profile.description,
                                    thumbnail: {
                                        url: user.avatarURL
                                    },
                                    fields: [
                                        {
                                            name: 'Balance',
                                            value: balance ? '<:coins:482589075459801098>' + balance.amount.toString() + ' Minicoins' : '<:coins:482589075459801098>0 Minicoins',
                                            inline: true
                                        },
                                        {
                                            name: 'Dev?',
                                            value: profile.developer ? 'Yes' : 'No',
                                            inline: true
                                        },
                                        {
                                            name: 'Married To',
                                            value: profile.marriedTo ? `${client.users.get(profile.marriedTo).username}#${client.users.get(profile.marriedTo).discriminator}` : 'Nobody'
                                        },
                                        {
                                            name: 'Items',
                                            value: `:pick: │ ${profile.itemPick}\n:ring: │ ${profile.itemRing}`
                                        }
                                    ]
                                }
                            })
                        })
                    })
                })
            } else {
                client.r.table('users').get(msg.author.id).run((error, profile) => {
        			if (!profile) return msg.channel.createMessage(':exclamation: │ You haven\'t set up your profile!')
                    client.r.table('balance').get(msg.author.id).run().then(balance => {
                        msg.channel.createMessage({
                            embed: {
                                author: {
                                    name: `${msg.author.username}#${msg.author.discriminator}'s Profile`,
                                    icon_url: msg.author.avatarURL
                                },
                                color: getEmbedColor(client, msg),
                                description: profile.description,
                                thumbnail: {
                                    url: msg.author.avatarURL
                                },
                                fields: [
                                    {
                                        name: 'Balance',
                                        value: balance ? '<:coins:482589075459801098>' + balance.amount.toString() + ' Minicoins' : '<:coins:482589075459801098>0 Minicoins',
                                        inline: true
                                    },
                                    {
                                        name: 'Dev?',
                                        value: profile.developer ? 'Yes' : 'No',
                                        inline: true
                                    },
                                    {
                                        name: 'Married To',
                                        value: profile.marriedTo ? `${client.users.get(profile.marriedTo).username}#${client.users.get(profile.marriedTo).discriminator}` : 'Nobody'
                                    },
                                    {
                                        name: 'Items',
                                        value: `:pick: │ ${profile.itemPick}\n:ring: │ ${profile.itemRing}`
                                    }
                                ]
                            }
                        })
                    })
                })
          	}
          	break
        case 'set':
            switch (args.shift().toLowerCase()) {
                case 'desc':
                case 'description':
                    client.r.table('users').get(msg.author.id).run().then(user => {
                        if (user) {
                            client.r.table('users').get(msg.author.id).update({
                                description: args.join(' ')
                            }).run((error) => {
            					if (error) return
                            })
                        } else {
                            client.r.table('users').insert({
                                id: msg.author.id,
                                description: args.join(' '),
                                developer: false,
                                marriedTo: null,
                                itemPick: 0,
                                itemRing: 0
                            }).run((error) => {
            					if (error) return
                            })
                        }
                        msg.channel.createMessage(`Set your description to **${args.join(' ')}**.`)
                    })
                    break
            }
            break
        case 'help':
            msg.channel.createMessage({
                embed: {
                    title: 'Profile Help',
                    color: getEmbedColor(client, msg),
                    fields: [
                        {
                            name: 'Set',
                            value: '**Usage:** `profile set description <value>`'
                        },
                        {
                            name: 'View',
                            value: '**Usage:** `profile view [user]`'
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: 'Status: 200',
                        icon_url: client.user.avatarURL
                    }
                }
            })
            break
    }
}

exports.help = {
  name: 'profile',
  description: 'Manage profiles.',
  usage: 'profile help',
  fullDesc: 'Manage profiles.',
  type: 'rp',
  status: 2,
  aliases: []
}
