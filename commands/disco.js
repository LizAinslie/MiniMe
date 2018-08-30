const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  msg.channel.send('<a:typing:393848431413559296> │ Generating...').then(message => {
    if (args[0]) {
      resolveUser(client, args.join(' ')).then(user => {
        snekfetch.get(`https://triggered-api.tk/api/v2/disco?url=${user.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
          const attachment = new Discord.Attachment(res.body, 'disco.gif')
          
          message.delete()
          msg.channel.send({
            embed: {
              author: {
                name: `${user.username} is dancing to the disco!`,
                icon_url: msg.author.displayAvatarURL
              },
              footer: {
                text: 'Status: 200',
                icon_url: client.user.avatarURL
              },
              timestamp: new Date(),
              color: getEmbedColor(msg),
              image: {
                url: 'attachment://disco.gif'
              }
            },
            files: [attachment]
          })
          msg.channel.stopTyping()
        })
      })
    } else {
      snekfetch.get(`https://triggered-api.tk/api/v2/disco?url=${msg.author.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        const attachment = new Discord.Attachment(res.body, 'disco.gif')
        
        message.delete()
        msg.channel.send({
          embed: {
            author: {
              name: `${msg.author.username} is dancing to the disco!`,
              icon_url: msg.author.displayAvatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(msg),
            image: {
              url: 'attachment://disco.gif'
            }
          },
          files: [attachment]
        })
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
  status: 2
}