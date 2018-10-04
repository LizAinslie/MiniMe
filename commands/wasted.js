const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const getBigAvatar = require('../util/getBigAvatar.js')
const snekfetch = require('snekfetch')

exports.run = (client, msg, args) => {
  msg.channel.createMessage('<a:typing:393848431413559296> │ Generating...').then(message => {
    if (args[0]) {
      resolveUser(client, args.join(' ')).then(user => {
        snekfetch.get(`https://triggered-api.tk/api/v2/wasted?url=${getBigAvatar(user)}`).set({ Authorization: client.config.apis.triggered }).then(res => {
          message.delete()
          msg.channel.createMessage({
            embed: {
              author: {
                name: `${user.username} has been wasted!`,
                icon_url: msg.author.avatarURL
              },
              footer: {
                text: 'Status: 200',
                icon_url: client.user.avatarURL
              },
              timestamp: new Date(),
              color: getEmbedColor(client, msg),
              image: {
                url: 'attachment://wasted.png'
              }
            }
          }, { file: res.body, name: 'wasted.png' })
        })
      })
    } else {
      snekfetch.get(`https://triggered-api.tk/api/v2/wasted?url=${msg.author.avatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        message.delete()
        msg.channel.createMessage({
          embed: {
            author: {
              name: `${msg.author.username} has been wasted!`,
              icon_url: msg.author.avatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(client, msg),
            image: {
              url: 'attachment://wasted.png'
            }
          }
        }, { file: res.body, name: 'wasted.png' })
      })
    }
  })
}

exports.help = {
  name: 'wasted',
  description: 'Give someone the wasted banner from GTA.',
  usage: 'wasted [user]',
  fullDesc: 'Give someone the wasted banner from GTA.',
  type: 'imgen',
  status: 2,
  aliases: []
}
