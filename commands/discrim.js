exports.run = (client, msg, args) => {
  const discrims = msg.guild.members.filterArray(user => user.discriminator === args[0])
  if (!discrims[0]) return msg.channel.send(':exclamation: │ No users with that discriminator!')
  msg.channel.send({
    embed: {
      author: {
        name: `Discriminator ${args[0]} │ Requested by ${msg.author.username}#${msg.author.discriminator}`,
        icon_url: msg.author.displayAvatarURL
      },
      timestamp: new Date(),
      color: client.config.color,
      description: discrims.map(u => `${u.user.username}#${u.user.discriminator}`).join('\n'),
      footer: {
        text: 'Status: 200',
        icon_url: client.user.avatarURL
      }
    }
  })
}

exports.help = {
  name: 'discrim',
  description: 'Get all the users with a certain discriminator.',
  usage: 'discrim <discriminator>',
  fullDesc: 'Get all the users with a certain discriminator.',
  type: 'util'
}