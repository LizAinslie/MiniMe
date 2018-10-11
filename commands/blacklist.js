const resolveUser = require('../util/resolveUser.js')

exports.run = (client, msg, args) => {
    client.r.table('users').get(msg.author.id).run().then(async user => {
        if (!user.developer) return msg.channel.createMessage(':no_entry_sign: │ You are not my developer!')
        switch (args.shift().toLowerCase) {
            case 'add':
                const userToBlacklist = await resolveUser(client, args.join(' '))
                client.r.table('users').get(userToBlacklist.id).run().then(profile => {
                    if (profile) {
                        if (profile.blacklisted) return msg.channel.createMessage(':exclamation: │ This user is already blacklisted!')
                        client.r.table('users').get(userToBlacklist.id).update({
                            blacklisted: true
                        }).run().then(() => {
                            msg.channel.createMessage(`:white_check_mark: │ Blacklisted **${userToBlacklist.username}#${userToBlacklist.discriminator}**.`)
                        })
                    } else {
                        client.r.table('users').insert({
                            id: userToBlacklist.id,
                            description: null,
                            developer: false,
                            marriedTo: null,
                            itemPick: 0,
                            itemRing: 0,
                            blacklisted: true
                        }).run().then(() => {
                            msg.channel.createMessage(`:white_check_mark: │ Blacklisted **${userToBlacklist.username}#${userToBlacklist.discriminator}**.`)
                        })
                    }
                })
            case 'remove':
                const userToUnBlacklist = await resolveUser(client, args.join(' '))
                client.r.table('users').get(userToUnBlacklist.id).run().then(profile => {
                    if (profile) {
                        if (!profile.blacklisted) return msg.channel.createMessage(':exclamation: │ This user is not blacklisted!')
                        client.r.table('users').get(userToUnBlacklist.id).update({
                            blacklisted: false
                        }).run().then(() => {
                            msg.channel.createMessage(`:white_check_mark: │ Unblacklisted **${userToUnBlacklist.username}#${userToUnBlacklist.discriminator}**.`)
                        })
                    } else {
                        client.r.table('users').insert({
                            id: userToUnBlacklist.id,
                            description: null,
                            developer: false,
                            marriedTo: null,
                            itemPick: 0,
                            itemRing: 0,
                            blacklisted: false
                        }).run().then(() => {
                            msg.channel.createMessage(`:white_check_mark: │ Unblacklisted **${userToUnBlacklist.username}#${userToUnBlacklist.discriminator}**.`)
                        })
                    }
                })
        }
    })
}

exports.help = {
    name: 'blacklist',
    description: 'Manage the blacklist.',
    usage: 'blacklist <add|remove> <user>',
    fullDesc: 'Manage the blacklist.',
    type: 'dev',
    status: 2,
    aliases: []
}