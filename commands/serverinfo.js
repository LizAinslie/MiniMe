exports.run = (client, msg) => {
  const guild = msg.guild
  msg.channel.send({
    embed: {
      color: client.config.color,
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "Status: 200"
      },
      thumbnail: {
        url: guild.iconURL
      },
      author: {
        name: `Server Info | Requested by ${msg.author.username}#${msg.author.discriminator}`,
        icon_url: msg.author.displayAvatarURL
      },
      fields: [
        {
          name: "Region",
          value: guild.region,
          inline: true
        },
        {
          name: "Owner",
          value: guild.owner.toString(),
          inline: true
        },
        {
          name: "ID",
          value: guild.id,
          inline: true
        },
        {
          name: "Members",
          value: guild.members.size,
          inline: true
        },
        {
          name: "Channels",
          value: guild.channels.size,
          inline: true
        },
        {
          name: "Large?",
          value: guild.large ? 'Yes' : 'No',
          inline: true
        },
        {
          name: "AFK Channel",
          value: guild.afkChannel ? guild.afkChannel.toString() : 'None',
          inline: true
        },
        {
          name: "Default Role",
          value: `<@&${guild.defaultRole.id}>`,
          inline: true
        },
        {
          name: "Roles",
          value: guild.roles.map(r =>  `<@&${r.id}>`).join(', '),
          inline: true
        },
        {
          name: "Custom Emoji",
          value: guild.emojis.map(e => `${e}`).join(', '),
          inline: true
        }
      ]
    }
  })
}

exports.help = {
  name: 'serverinfo',
  description: 'Gets information about the server you are currently in.',
  usage: 'serverinfo',
  fullDesc: 'Gets information about the server you are currently in.',
  type: 'util'
}