const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')

exports.run = (client, msg, args) => {
  msg.channel.createMessage('<a:typing:393848431413559296> │ Generating...').then(message => {
    if (args[0]) {
      resolveUser(client, args.join(' ')).then(user => {
        snekfetch.get(`https://triggered-api.tk/api/v2/disco?url=${user.avatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
          message.delete()
          msg.channel.createMessage({
            embed: {
              author: {
                name: `${user.username} is dancing to the disco!`,
                icon_url: msg.author.avatarURL
              },
              footer: {
                text: 'Status: 200',
                icon_url: client.user.avatarURL
              },
              timestamp: new Date(),
              color: getEmbedColor(client, msg),
              image: {
                url: 'attachment://disco.gif'
              }
            }
          }, { file: res.body, name: 'disco.gif'})
        })
      })
    } else {
      snekfetch.get(`https://triggered-api.tk/api/v2/disco?url=${msg.author.avatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        message.delete()
        msg.channel.createMessage({
          embed: {
            author: {
              name: `${msg.author.username} is dancing to the disco!`,
              icon_url: msg.author.avatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(client, msg),
            image: {
              url: 'attachment://disco.gif'
            }
          }
        }, { file: res.body, name: 'disco.gif'})
      })
    }
  })
}

exports.help = {
  name: 'disco',
  description: 'Make someone dance!',
  usage: 'disco [user]',
  fullDesc: 'Make someone dance!',
  type: 'imgen',
  status: 2,
  aliases: []
}