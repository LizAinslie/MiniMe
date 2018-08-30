const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  msg.channel.send('<a:typing:393848431413559296> │ Generating...').then(message => {
    if (args[0]) {
      resolveUser(client, args.join(' ')).then(user => {
        snekfetch.get(`https://triggered-api.tk/api/v2/triggered?url=${user.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
          const attachment = new Discord.Attachment(res.body, 'triggered.gif')
          
          message.delete()
          msg.channel.send({
            embed: {
              author: {
                name: `${user.username} has been triggered!`,
                icon_url: msg.author.displayAvatarURL
              },
              footer: {
                text: 'Status: 200',
                icon_url: client.user.avatarURL
              },
              timestamp: new Date(),
              color: getEmbedColor(msg),
              image: {
                url: 'attachment://triggered.gif'
              }
            },
            files: [attachment]
          })
        })
      })
    } else {
      snekfetch.get(`https://triggered-api.tk/api/v2/triggered?url=${msg.author.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        const attachment = new Discord.Attachment(res.body, 'triggered.gif')
        
        message.delete()
        msg.channel.send({
          embed: {
            author: {
              name: `${msg.author.username} has been triggered!`,
              icon_url: msg.author.displayAvatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(msg),
            image: {
              url: 'attachment://triggered.gif'
            }
          },
          files: [attachment]
        })
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
  status: 2
}