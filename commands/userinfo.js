/* Eris Fixed */

const dateformat = require('dateformat')
const resolveMember = require('../util/resolveMember.js')
const { capitalize } = require('lodash')
const getEmbedColor = require('../util/getHighestRoleColor.js')

const statuses = {
  online: '<:online:313956277808005120>',
  idle: '<:away:313956277220802560>',
  dnd: '<:dnd:313956276893646850>',
  offline: '<:offline:313956277237710868>'
}

const gameTypes = [
  'Playing',
  'Streaming', 
  'Listening', 
  'Watching'
]

exports.run = (client, message, args) => {
  if (args[0]) {
    resolveMember(client, args.join(' '), message.channel.guild).then((user) => {
      message.channel.createMessage({
        embed: {
          title: user.username + '#' + user.discriminator,
          color: getEmbedColor(message),
          thumbnail: {
            url: user.avatarURL
          },
          author: {
            icon_url: message.author.avatarURL,
            name: `User Info │ Requested by ${message.author.username}#${message.author.discriminator}`
          },
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 200'
          },
          timestamp: new Date(),
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
              name: 'Username:',
              value: user.username,
              inline: true
            },
            {
              name: 'Discriminator:',
              value: user.discriminator,
              inline: true
            },
            {
              name: 'Status:',
              value: `${statuses[user.status]} │ ${capitalize(user.status)}`,
              inline: true
            },
            {
              name: 'Game:',
              value: user.game ? `${gameTypes[user.game.type]} ${user.game.name} │ [Join them!](${user.game.url})` : 'None',
              inline: true
            }
          ]
        }
      })
    }).catch(() => {
      message.channel.createMessage(':exclamation: │ I was unable to find any users from that query.')
    })
  } else {
    const user = message.member
    message.channel.createMessage({
      embed: {
        title: user.username + '#' + user.discriminator,
        color: getEmbedColor(message),
        thumbnail: {
          url: user.avatarURL
        },
        author: {
          icon_url: message.author.avatarURL,
          name: `User Info │ Requested by ${message.author.username}#${message.author.discriminator}`
        },
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        },
        timestamp: new Date(),
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
            name: 'Username:',
            value: user.username,
            inline: true
          },
          {
            name: 'Discriminator:',
            value: user.discriminator,
            inline: true
          },
          {
            name: 'Status:',
            value: `${statuses[user.status]} │ ${capitalize(user.status)}`,
            inline: true
          },
          {
            name: 'Game:',
            value: user.game ? `${gameTypes[user.game.type]} ${user.game.name} │ [Join them!](${user.game.url})` : 'None',
            inline: true
          }
        ]
      }
    })
  }
}

exports.type = 'text'

exports.help = {
  name: 'userinfo',
  description: 'Gives info on the specified user.',
  usage: 'userinfo[ <user>]',
  fullDesc: 'Gives info on the specified user. If no user is given, info on the user running the command.',
  type: 'util',
  status: 2,
  aliases: []
}
