const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')

exports.run = (client, msg, args) => {
  msg.channel.createMessage('<a:typing:393848431413559296> │ Generating...').then(message => {
    if (args[0]) {
      resolveUser(client, args.join(' ')).then(user => {
        snekfetch.get(`https://triggered-api.tk/api/v2/convmatrix?url=${user.avatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
          message.delete()
          msg.channel.createMessage({
            embed: {
              author: {
                name: `${user.username} has been colorized!`,
                icon_url: msg.author.avatarURL
              },
              footer: {
                text: 'Status: 200',
                icon_url: client.user.avatarURL
              },
              timestamp: new Date(),
              color: getEmbedColor(msg),
              image: {
                url: 'attachment://colorize.png'
              }
            }
          }, { file: res.body, name: 'colorize.png'})
        })
      })
    } else {
      snekfetch.get(`https://triggered-api.tk/api/v2/convmatrix?url=${msg.author.avatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        message.delete()
        msg.channel.createMessage({
          embed: {
            author: {
              name: `${msg.author.username} has been colorized!`,
              icon_url: msg.author.avatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(msg),
            image: {
              url: 'attachment://colorize.png'
            }
          }
        }, { file: res.body, name: 'colorize.png'})
      })
    }
  })
}

exports.help = {
  name: 'colorize',
  description: 'Colorize someone!',
  usage: 'colorize [user]',
  fullDesc: 'Colorize someone!',
  type: 'imgen',
  status: 2,
  aliases: []
}