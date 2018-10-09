const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const getBigAvatar = require('../util/getBigAvatar.js')
const snekfetch = require('snekfetch')

exports.run = (client, msg, args) => {
  msg.channel.createMessage('<a:typing:393848431413559296> │ Generating...').then(message => {
    if (args[0]) {
      resolveUser(client, args.join(' ')).then(user => {
        snekfetch.get(`https://triggered-api.tk/api/v2/triggered?url=${getBigAvatar(user)}`).set({ Authorization: client.config.apis.triggered }).then(res => {
          message.delete()
          msg.channel.createMessage({
            embed: {
              author: {
                name: `${user.username} has been triggered!`,
                icon_url: msg.author.avatarURL
              },
              footer: {
                text: 'Status: 200',
                icon_url: client.user.avatarURL
              },
              timestamp: new Date(),
              color: getEmbedColor(client, msg),
              image: {
                url: 'attachment://triggered.gif'
              }
            }
          }, { file: res.body, name: 'triggered.gif' })
        })
      })
    } else {
      snekfetch.get(`https://triggered-api.tk/api/v2/triggered?url=${getBigAvatar(msg.author)}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        message.delete()
        msg.channel.createMessage({
          embed: {
            author: {
              name: `${msg.author.username} has been triggered!`,
              icon_url: msg.author.avatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(client, msg),
            image: {
              url: 'attachment://triggered.gif'
            }
          }
        }, { file: res.body, name: 'triggered.gif' })
      })
    }
  })
}

exports.help = {
  name: 'triggered',
  description: 'Trigger someone!',
  usage: 'triggered [user]',
  fullDesc: 'Trigger someone!',
  type: 'imgen',
  status: 2,
  aliases: []
}
