const resolveUser = require('../util/resolveUser.js')
const Logger = require('../util/Logger.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
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
                                    value: balance ? '<:coins:482589075459801098> ' + balance.amount.toString() : '<:coins:482589075459801098> 0',
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
                                value: balance ? balance.amount.toString() : 0,
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
}

exports.help = {
  name: 'profile',
  description: 'Check a users profile.',
  usage: 'profile [user]',
  fullDesc: 'Check a users profile.',
  type: 'fun',
  status: 2,
  aliases: []
}
