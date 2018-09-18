/* Eris Fixed */

const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')

exports.run = (client, msg, args) => {
  msg.channel.createMessage('<a:typing:393848431413559296> │ Generating...').then(message => {
    if (args[0]) {
      resolveUser(client, args.join(' ')).then(user => {
        snekfetch.get(`https://triggered-api.tk/api/v2/beautiful?url=${user.avatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
          message.delete()
          msg.channel.createMessage({
            embed: {
              author: {
                name: `${user.username} is beautiful!`,
                icon_url: msg.author.avatarURL
              },
              footer: {
                text: 'Status: 200',
                icon_url: client.user.avatarURL
              },
              timestamp: new Date(),
              color: getEmbedColor(client, msg),
              image: {
                url: 'attachment://beautiful.png'
              }
            },
          }, { file: res.body, name: 'beautiful.png' })
        })
      })
    } else {
      snekfetch.get(`https://triggered-api.tk/api/v2/beautiful?url=${msg.author.avatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        message.delete()
        msg.channel.createMessage({
          embed: {
            author: {
              name: `${msg.author.username} is beautiful!`,
              icon_url: msg.author.avatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(client, msg),
            image: {
              url: 'attachment://beautiful.png'
            }
          }
        }, { file: res.body, name: 'beautiful.png' })
      })
    }
  })
}

exports.help = {
  name: 'beautiful',
  description: 'Make someone beautiful.',
  usage: 'beautiful [user]',
  fullDesc: 'Make someone beautiful.',
  type: 'imgen',
  status: 2,
  aliases: []
}
