const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')
const getBigAvatar = require('../util/getBigAvatar.js')

exports.run = (client, msg, args) => {
  msg.channel.createMessage('<a:typing:393848431413559296> │ Generating...').then(message => {
    if (args[0]) {
      resolveUser(client, args.join(' ')).then(user => {
        snekfetch.get(`https://triggered-api.tk/api/v2/checkout?url=${getBigAvatar(user)}`).set({ Authorization: client.config.apis.triggered }).then(res => {
          message.delete()
          msg.channel.createMessage({
            embed: {
              author: {
                name: `${user.username} is being checked out!`,
                icon_url: msg.author.avatarURL
              },
              footer: {
                text: 'Status: 200',
                icon_url: client.user.avatarURL
              },
              timestamp: new Date(),
              color: getEmbedColor(client, msg),
              image: {
                url: 'attachment://checkout.png'
              }
            }
          }, { file: res.body, name: 'checkout.png' })
        })
      })
    } else {
      snekfetch.get(`https://triggered-api.tk/api/v2/checkout?url=${getBigAvatar(msg.author)}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        message.delete()
        msg.channel.createMessage({
          embed: {
            author: {
              name: `${msg.author.username} is being checked out!`,
              icon_url: msg.author.avatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(client, msg),
            image: {
              url: 'attachment://checkout.png'
            }
          }
        }, { file: res.body, name: 'checkout.png' })
      })
    }
  })
}

exports.help = {
  name: 'checkout',
  description: 'Check someone out!',
  usage: 'checkout [user]',
  fullDesc: 'Check someone out!',
  type: 'imgen',
  status: 2,
  aliases: []
}
