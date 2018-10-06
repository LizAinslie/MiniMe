const snekfetch = require('snekfetch')
const Logger = require('../util/Logger.js')
const resolveUser = require('../util/resolveUser.js')

exports.run = async (client, msg, args) => {
    if (args[0]) {
        resolveUser(client, args.join()).then(user => {
            let text = msg.author.username + ' pats ' + user.username + '!'
            snekfetch.get(`https://rra.ram.moe/i/r?type=pat`)
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11')
            .end((err, res) => {
                if (err) {
                    msg.channel.createMessage(':exclamation: │ There was an error running the command. This incident has been reported.')
                    Logger.error(client, `[pat.js] snekfetch error.`, err)
                }

                let gif = 'https://rra.ram.moe' + res.body.path
                msg.channel.createMessage({
                    embed: {
                        author: {
                            name: text,
                            icon_url: msg.author.avatarURL
                        },
                        image: {
                            url: gif
                        }
                    }
                })
            })
        })
    } else {
        let text = msg.author.username + ' pats themselves!'
        snekfetch.get(`https://rra.ram.moe/i/r?type=pat`)
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11')
        .end((err, res) => {
            if (err) {
                msg.channel.createMessage(':exclamation: │ There was an error running the command. This incident has been reported.')
                Logger.error(client, `[pat.js] snekfetch error.`, err)
            }

            let gif = 'https://rra.ram.moe' + res.body.path
            msg.channel.createMessage({
                embed: {
                    author: {
                        name: text,
                        icon_url: msg.author.avatarURL
                    },
                    image: {
                        url: gif
                    }
                }
            })
        })
    }
}

exports.help = {
    name: 'pat',
    description: 'Pat someone.',
    usage: 'pat',
    fullDesc: 'Pat someone by mentioning them (or pat yourself).',
    type: 'img',
    status: 1,
    aliases: ['pet']
}
