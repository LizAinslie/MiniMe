exports.run = (client, msg, args) => {
    switch (args.shift()) {
        case 'desc':
        case 'description':
            client.r.table('users').get(msg.author.id).run().then(user => {
                if (user) {
                    client.r.table('users').get(msg.author.id).update({
                        description: args.join(' ')
                    }).run((error) => {
    					if (error) return;
                    });
                } else {
                    client.r.table('users').insert({
                        id: msg.author.id,
                        description: args.join(' '),
                        developer: false,
                        marriedTo: null,
                        itemPick: 0,
                        itemRing: 0
                    }).run((error) => {
    					if (error) return;
                    });
                }
                msg.channel.createMessage(`Set your description to **${args.join(' ')}**.`)
            });
    }
}

exports.help = {
    name: 'setprofile',
    description: 'Set your profile settings.',
    usage: 'setprofile description <value>',
    fullDesc: 'Set your profile settings.',
    type: 'fun',
    status: 2,
    aliases: []
  }