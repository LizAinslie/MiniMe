const getEmbedColor = require('../util/getHighestRoleColor.js')
const resolveGuild = require('../util/resolveGuild.js')

exports.run = (client, msg, args) => {
  if (args[0]) {
    resolveGuild(client, args.join(' ')).then(guild => {
      msg.channel.createMessage({
        embed: {
          color: getEmbedColor(msg),
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 200'
          },
          thumbnail: {
            url: guild.iconURL
          },
          author: {
            name: `${guild.name} Server Info │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
            icon_url: msg.author.displayAvatarURL
          },
          fields: [
            {
              name: ':map: │ Region',
              value: guild.region,
              inline: true
            },
            {
              name: '<:owner:455810041027756053> │ Owner',
              value: guild.owner.toString(),
              inline: true
            },
            {
              name: ':label: │ ID',
              value: guild.id,
              inline: true
            },
            {
              name: ':busts_in_silhouette: │ Members',
              value: guild.members.size,
              inline: true
            },
            {
              name: 'Channels',
              value: guild.channels.size,
              inline: true
            },
            {
              name: 'Large?',
              value: guild.large ? 'Yes' : 'No',
              inline: true
            },
            {
              name: 'AFK Channel',
              value: guild.afkChannel ? guild.afkChannel.toString() : 'None',
              inline: true
            },
            {
              name: 'Default Role',
              value: guild.defaultRole.name,
              inline: true
            },
            {
              name: ':dividers: │ Roles',
              value: guild.roles.map(r => r.name).join(', ').length <= 1024 ? guild.roles.map(r => r.name).join(', ') : guild.roles.size,
              inline: true
            },
            {
              name: ':dividers: │ Custom Emoji',
              value: guild.emojis.map(e => `${e}`).join('').length <= 1024 ? guild.emojis.map(e => `${e}`).join('') : guild.emojis.size,
              inline: true
            }
          ]
        }
      })
    }).catch(err => {
      msg.channel.createMessage(':interrobang: │ Unable to find a guild by that query!')
      console.log(err)
    })
  } else {
    const guild = msg.guild
    msg.channel.createMessage({
      embed: {
        color: getEmbedColor(msg),
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        },
        thumbnail: {
          url: guild.iconURL
        },
        author: {
          name: `${guild.name} Server Info │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
          icon_url: msg.author.displayAvatarURL
        },
        fields: [
          {
            name: ':map: │ Region',
            value: guild.region,
            inline: true
          },
          {
            name: '<:owner:455810041027756053> │ Owner',
            value: guild.owner.toString(),
            inline: true
          },
          {
            name: ':label: │ ID',
            value: guild.id,
            inline: true
          },
          {
            name: ':busts_in_silhouette: │ Members',
            value: guild.members.size,
            inline: true
          },
          {
            name: 'Channels',
            value: guild.channels.size,
            inline: true
          },
          {
            name: 'Large?',
            value: guild.large ? 'Yes' : 'No',
            inline: true
          },
          {
            name: 'AFK Channel',
            value: guild.afkChannel ? guild.afkChannel.toString() : 'None',
            inline: true
          },
          {
            name: 'Default Role',
            value: `<@&${guild.defaultRole.id}>`,
            inline: true
          },
          {
            name: ':dividers: │ Roles',
            value: guild.roles.map(r => `<@&${r.id}>`).join(', ').length <= 1024 ? guild.roles.map(r => `<@&${r.id}>`).join(', ') : guild.roles.size,
            inline: true
          },
          {
            name: ':dividers: │ Custom Emoji',
            value: guild.emojis.map(e => `${e}`).join('').length <= 1024 ? guild.emojis.map(e => `${e}`).join('') : guild.emojis.size,
            inline: true
          }
        ]
      }
    })
  }
}

exports.help = {
  name: 'serverinfo',
  description: 'Gets information about the server you are currently in.',
  usage: 'serverinfo',
  fullDesc: 'Gets information about the server you are currently in.',
  type: 'util',
  status: 2
}
