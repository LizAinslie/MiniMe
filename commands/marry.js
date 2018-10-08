const resolveUser = require('../util/resolveUser.js')

exports.run = (client, msg, args) => {
    client.r.table('users').get(msg.author.id).run().then(profile => {
        if (!profile) return msg.channel.createMessage(':exclamation: │ You haven\'t set up your profile!')
        if (profile.marriedTo) return msg.channel.createMessage(':exclamation: │ Yor\'re already married!')
        if (1 > profile.itemRing) return msg.channel.createMessage(':exclamation: │ You need a ring!');
        client.r.table('users').get(msg.author.id).update({
            itemRing: profile.itemRing - 1
        }).run().then(newProfile => {
            resolveUser(client, args.join(' ')).then(async toMarry => {
                if (toMarry.bot) return msg.channel.createMessage(':exclamation: │ You can\'t marry a bot!')
                msg.channel.createMessage(`<@${toMarry.id}>, do you accept <@${msg.author.id}>'s proposal?`)
                let responses = await msg.channel.awaitMessages(m => m.author.id === toMarry.id, { time: 10000, maxMatches: 1 });
                
                if (responses[0].content.toLowerCase() == "yes") {
                    msg.channel.createMessage(`<@${msg.author.id}>, <@${toMarry.id}> accepted your proposal!`)
                    
                    client.r.table('users').get(msg.author.id).update({
                        marriedTo: toMarry.id
                    }).run().then(married => {
                        client.r.table('users').get(toMarry.id).update({
                            marriedTo: msg.author.id
                        }).run().then(done => {
                            msg.channel.createMessage(`<@${msg.author.id}> and <@${toMarry.id}> are married now! :tada:`)
                        })
                    })
                }
            })
        })
    })
}

exports.help = {
  name: 'marry',
  description: 'Get married.',
  usage: 'marry <user>',
  fullDesc: 'Get married.',
  type: 'rp',
  status: 2,
  aliases: []
}