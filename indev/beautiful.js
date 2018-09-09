const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')

exports.run = (client, msg, args) => {
  if (args[0]) {
    resolveUser(client, args.join(' ')).then(user => {
      snekfetch.get(`https://triggered-api.tk/api/v2/beautiful?url=${user.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {

        msg.channel.createMessage({
          embed: {
            author: {
              name: `${user.username} is beautiful!`,
              icon_url: msg.author.displayAvatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(msg),
            image: {
              url: 'attachment://beautiful.png'
            }
          },
        }, res.body)
      })
    })
  } else {
    snekfetch.get(`https://triggered-api.tk/api/v2/beautiful?url=${msg.author.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
      const attachment = new Discord.Attachment(res.body, 'beautiful.png')

      msg.channel.createMessage({
        embed: {
          author: {
            name: `${msg.author.username} is beautiful!`,
            icon_url: msg.author.displayAvatarURL
          },
          footer: {
            text: 'Status: 200',
            icon_url: client.user.avatarURL
          },
          timestamp: new Date(),
          color: getEmbedColor(msg),
          image: {
            url: 'attachment://beautiful.png'
          }
        },
        files: [attachment]
      })
    })
  }
}

exports.help = {
  name: 'beautiful',
  description: 'Make someone beautiful.',
  usage: 'beautiful [user]',
  fullDesc: 'Make someone beautiful.',
  type: 'imgen',
  status: 2
}
