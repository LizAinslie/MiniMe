const dateformat = require('dateformat')
const util = require('../util.js')
const funcs = require('../modules/functions.js')

exports.run = (client, message, args) => {
  util.resolveUser(client, args.length > 0 ? args.join(' ') : message.author.id).then((user) => {
    message.channel.send({
      embed: {
        title: user.username + '#' + user.discriminator,
        'color': 14501173,
        thumbnail: {
          url: user.avatar ? (user.avatar.startsWith('a_') ? 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.gif?size=256' : 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.png?size=256') : 'https://cdn.discordapp.com/embed/avatars/' + (user.discriminator % 5) + '.png?size=256'
        },
        fields: [
          {
            name: 'Created At:',
            value: dateformat(user.createdAt, 'mm/dd/yyyy hh:MM:ss TT'),
            inline: true
          },
          {
            name: 'Bot:',
            value: user.bot ? 'Yes' : 'No',
            inline: true
          },
          {
            name: 'ID:',
            value: user.id,
            inline: true
          },
          {
            name: 'Status:',
            value: funcs.toTitleCase(user.presence.status),
            inline: true
          }
        ]
      }
    })
  }).catch(() => {
    message.channel.send(':exclamation: │ I was unable to find any users from that query.')
  })
}

exports.type = 'text'

exports.help = {
  name: 'userinfo',
  description: 'Gives info on the specified user.',
  usage: 'userinfo[ <user>]',
  fullDesc: 'Gives info on the specified user. If no user is given, info on the user running the command.'
}
