const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  if (args[0]) {
    resolveUser(client, args.join(' ')).then(user => {
      snekfetch.get(`https://triggered-api.tk/api/v2/blurple?url=${user.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        const attachment = new Discord.Attachment(res.body, 'blurple.png')

        msg.channel.send({
          embed: {
            author: {
              name: `${user.username} has been blurplefied!`,
              icon_url: msg.author.displayAvatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(msg),
            image: {
              url: 'attachment://blurple.png'
            }
          },
          files: [attachment]
        })
      })
    })
  } else {
    snekfetch.get(`https://triggered-api.tk/api/v2/blurple?url=${msg.author.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
      const attachment = new Discord.Attachment(res.body, 'blurple.png')

      msg.channel.send({
        embed: {
          author: {
            name: `${msg.author.username} has been blurplefied!`,
            icon_url: msg.author.displayAvatarURL
          },
          footer: {
            text: 'Status: 200',
            icon_url: client.user.avatarURL
          },
          timestamp: new Date(),
          color: getEmbedColor(msg),
          image: {
            url: 'attachment://blurple.png'
          }
        },
        files: [attachment]
      })
    })
  }
}

exports.help = {
  name: 'blurple',
  description: 'Blurplefy someone!',
  usage: 'blurple [user]',
  fullDesc: 'Blurplefy someone!',
  type: 'imgen',
  status: 2
}
