const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  if (args[0]) {
    resolveUser(client, args.join(' ')).then(user => {
      snekfetch.get(`https://triggered-api.tk/api/v2/wasted?url=${user.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        const attachment = new Discord.Attachment(res.body, 'wasted.png')

        msg.channel.send({
          embed: {
            author: {
              name: `${user.username} has been wasted!`,
              icon_url: msg.author.displayAvatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(msg),
            image: {
              url: 'attachment://wasted.png'
            }
          },
          files: [attachment]
        })
      })
    })
  } else {
    snekfetch.get(`https://triggered-api.tk/api/v2/wasted?url=${msg.author.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
      const attachment = new Discord.Attachment(res.body, 'wasted.png')

      msg.channel.send({
        embed: {
          author: {
            name: `${msg.author.username} has been wasted!`,
            icon_url: msg.author.displayAvatarURL
          },
          footer: {
            text: 'Status: 200',
            icon_url: client.user.avatarURL
          },
          timestamp: new Date(),
          color: getEmbedColor(msg),
          image: {
            url: 'attachment://wasted.png'
          }
        },
        files: [attachment]
      })
    })
  }
}

exports.help = {
  name: 'wasted',
  description: 'Give someone the wasted banner from GTA.',
  usage: 'wasted [user]',
  fullDesc: 'Give someone the wasted banner from GTA.',
  type: 'imgen',
  status: 2
}