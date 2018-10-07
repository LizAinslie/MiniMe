const getEmbedColor = require('../util/getHighestRoleColor.js')
const updateBalance = require('../util/updateBalance.js')

exports.run = (client, msg, args) => {
    switch(args.shift()) {
        case 'list':
        case 'items':
            msg.channel.createMessage({
                embed: {
                    title: 'Shop Items',
                    color: getEmbedColor(client, msg),
                    description: 'These are the items you can buy.',
                    fields: [
                        {
                            name: ':pick: │ Pick',
                            value: '<:coins:482589075459801098> 100\nEnables you to work.',
                            inline: true
                        },
                        {
                            name: ':ring: │ Ring',
                            value: '<:coins:482589075459801098> 10000\nUse this to get married to someone.'
                        }
                    ]
                }
            })
            break;
        case 'buy':
            switch(args.shift()) {
                case 'pick':
                    client.r.table('balance').get(msg.author.id).run((error, balance) => {
                        if (!balance || 100 > balance.amount) return msg.channel.createMessage(':exclamation: │ You cannot spend more money than you have.');
                        updateBalance(client.r, msg.author.id, -100).then(bal => {
                            client.r.table('users').get(msg.author.id).run().then(user => {
                                if (user) {
                                    client.r.table('users').get(msg.author.id).update({
                                        itemPick: user.itemPick + 1
                                    }).run((error) => {
                                        if (error) return;
                                    });
                                } else {
                                    client.r.table('users').insert({
                                        id: msg.author.id,
                                        description: 'This user prefers to keep their autobiography a mystery.',
                                        developer: false,
                                        marriedTo: null,
                                        itemPick: 1,
                                        itemRing: 0
                                    }).run((error) => {
                                        if (error) return;
                                    });
                                }
                                msg.channel.createMessage(`You bought one :pick:Pick for **<:coins:482589075459801098> 100 Minicoins**.`)
                            });
                        })
                    })
                    case 'pick':
                    client.r.table('balance').get(msg.author.id).run((error, balance) => {
                        if (!balance || 10000 > balance.amount) return msg.channel.createMessage(':exclamation: │ You cannot spend more money than you have.');
                        updateBalance(client.r, msg.author.id, -10000).then(bal => {
                            client.r.table('users').get(msg.author.id).run().then(user => {
                                if (user) {
                                    client.r.table('users').get(msg.author.id).update({
                                        itemRing: user.itemRing + 1
                                    }).run((error) => {
                                        if (error) return;
                                    });
                                } else {
                                    client.r.table('users').insert({
                                        id: msg.author.id,
                                        description: 'This user prefers to keep their autobiography a mystery.',
                                        developer: false,
                                        marriedTo: null,
                                        itemPick: 0,
                                        itemRing: 1
                                    }).run((error) => {
                                        if (error) return;
                                    });
                                }
                                msg.channel.createMessage(`You bought one :ring:Ring for **<:coins:482589075459801098> 10000 Minicoins**.`)
                            });
                        })
                    })
            }
    }
}

exports.help = {
    name: 'shop',
    description: 'Use the shop.',
    usage: 'shop <buy [item]|list>',
    fullDesc: 'Use the shop.',
    type: 'eco',
    status: 2,
    aliases: ['store']
}
