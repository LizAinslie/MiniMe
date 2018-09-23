const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const snekfetch = require('snekfetch')
const Discord = require('discord.js')

exports.run = (client, msg, args) => {
  msg.channel.createMessage('<a:typing:393848431413559296> │ Generating...').then(message => {
    if (args[0]) {
      resolveUser(client, args.join(' ')).then(user => {
        snekfetch.get(`https://triggered-api.tk/api/v2/convmatrix?url=${user.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
          const attachment = new Discord.Attachment(res.body, 'colorize.png')
          
          message.delete()
          msg.channel.createMessage({
            embed: {
              author: {
                name: `${user.username} has been colorized!`,
                icon_url: msg.author.displayAvatarURL
              },
              footer: {
                text: 'Status: 200',
                icon_url: client.user.avatarURL
              },
              timestamp: new Date(),
              color: getEmbedColor(msg),
              image: {
                url: 'attachment://colorize.png'
              }
            },
            files: [attachment]
          })
        })
      })
    } else {
      snekfetch.get(`https://triggered-api.tk/api/v2/convmatrix?url=${msg.author.displayAvatarURL}`).set({ Authorization: client.config.apis.triggered }).then(res => {
        const attachment = new Discord.Attachment(res.body, 'colorize.png')
        
        message.delete()
        msg.channel.createMessage({
          embed: {
            author: {
              name: `${msg.author.username} has been colorized!`,
              icon_url: msg.author.displayAvatarURL
            },
            footer: {
              text: 'Status: 200',
              icon_url: client.user.avatarURL
            },
            timestamp: new Date(),
            color: getEmbedColor(msg),
            image: {
              url: 'attachment://colorize.png'
            }
          },
          files: [attachment]
        })
      })
    }
  })
}

exports.help = {
  name: 'colorize',
  description: 'Colorize someone!',
  usage: 'colorize [user]',
  fullDesc: 'Colorize someone!',
  type: 'imgen',
  status: 2
}