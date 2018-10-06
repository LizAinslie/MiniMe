const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')
const getBigAvatar = require('../util/getBigAvatar.js')

exports.run = (client, msg, args) => {
  msg.channel.createMessage('<a:typing:393848431413559296> │ Generating...').then(message => {
    if (args[0]) {
      resolveUser(client, args.join(' ')).then(user => {
        snekfetch.get(`https://triggered-api.tk/api/v2/glitch?url=${getBigAvatar(user)}`).set({ Authorization: client.config.apis.triggered }).then(res => {
          message.delete()
          msg.channel.createMessage({
            embed: {
              author: {
                name: `${user.username} has been glitched!`,
                icon_url: msg.author.avatarURL
              },
              footer: {
                text: 'Status: 200',
                icon_url: client.user.avatarURL
              },
              timestamp: new Date(),
              color: getEmbedColor(client, msg),
              image: {
                url: 'attachment://glitch.png'
              }
            }
          }, { file: res.body, name: 'glitch.png' })
        })
      })
    } else {
      snekfetch.get(`https://triggered-api.tk/api/v2/glitch?url=${getBigAvatar(msg.author)}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        message.delete()
        msg.channel.createMessage({
          embed: {
            author: {
              name: `${msg.author.username} has been glitched!`,
              icon_url: msg.author.avatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(client, msg),
            image: {
              url: 'attachment://glitch.png'
            }
          }
        }, { file: res.body, name: 'glitch.png' })
      })
    }
  })
}

exports.help = {
  name: 'glitch',
  description: 'Make someone glitch!',
  usage: 'glitch [user]',
  fullDesc: 'Make someone glitch!',
  type: 'imgen',
  status: 2,
  aliases: []
}
