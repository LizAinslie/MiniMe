const snekfetch = require('snekfetch')
const resolveUser = require('../util/resolveUser.js')
const getEmbedColor = require('../util/getHighestRoleColor.js')

exports.run = (client, msg, args) => {
  resolveUser(client, args.join(' ')).then(user => {
    if (!user.bot) return msg.channel.createMessage(`:exclamation: | ${user} is not a bot!`)
    snekfetch.get(`https://discordbots.org/api/bots/${user.id}`).then(res => {
      const bot = res.body
      msg.channel.createMessage({
        embed: {
          title: bot.username,
          color: getEmbedColor(msg),
          thumbnail: {
            url: user.displayAvatarURL
          },
          description: bot.shortdesc,
          image: {
            url: `https://discordbots.org/api/widget/${bot.id}.png`
          },
          author: {
            icon_url: msg.author.displayAvatarURL,
            name: `DBL │ Requested by ${msg.author.username}#${msg.author.discriminator}`
          },
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 200'
          },
          timestamp: new Date(),
          fields: [
            {
              name: 'Prefix',
              value: bot.prefix,
              inline: true
            },
            {
              name: 'Library',
              value: bot.lib,
              inline: true
            },
            {
              name: 'Discriminator',
              value: bot.discriminator,
              inline: true
            },
            {
              name: 'Owners',
              value: bot.owners.map(o => `<@${o}>`).join(', '),
              inline: true
            },
            {
              name: 'Certified?',
              value: bot.certifiedBot ? 'Yes' : 'No',
              inline: true
            },
            {
              name: 'ID',
              value: bot.id,
              inline: true
            }
          ]
        }
      })
    }).catch(err => {
      msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
      client.rollbar.error('Error looking up bot on DBL: ' + err)
    })
  }).catch(err => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
    client.rollbar.error('Error looking up bot on DBL: ' + err)
  })
}

exports.help = {
  name: 'dbl',
  description: 'Retrieve bot information from the Discord Bot List.',
  usage: 'dbl <botName>',
  fullDesc: 'Retrieve bot information from the Discord Bot List. Must supply a bot name.',
  type: 'util',
  status: 2
}
