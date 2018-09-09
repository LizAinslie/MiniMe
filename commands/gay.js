const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  if (args[0]) {
    resolveUser(client, args.join(' ')).then(user => {
      snekfetch.get(`https://triggered-api.tk/api/v2/rainbow?url=${user.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        const attachment = new Discord.Attachment(res.body, 'gay.png')

        msg.channel.createMessage({
          embed: {
            author: {
              name: `${user.username} is gay!`,
              icon_url: msg.author.displayAvatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(msg),
            image: {
              url: 'attachment://gay.png'
            }
          },
          files: [attachment]
        })
      })
    })
  } else {
    snekfetch.get(`https://triggered-api.tk/api/v2/rainbow?url=${msg.author.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
      const attachment = new Discord.Attachment(res.body, 'gay.png')

      msg.channel.createMessage({
        embed: {
          author: {
            name: `${msg.author.username} is gay!`,
            icon_url: msg.author.displayAvatarURL
          },
          footer: {
            text: 'Status: 200',
            icon_url: client.user.avatarURL
          },
          timestamp: new Date(),
          color: getEmbedColor(msg),
          image: {
            url: 'attachment://gay.png'
          }
        },
        files: [attachment]
      })
    })
  }
}

exports.help = {
  name: 'gay',
  description: 'Make someone look gay.',
  usage: 'gay [user]',
  fullDesc: 'Make someone look gay.',
  type: 'imgen',
  status: 2
}