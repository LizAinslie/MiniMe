module.exports = (client, guild) => {
  const guildLogChannel = client.channels.get('480811642045595648')

  guildLogChannel.send({
    embed: {
      color: client.config.color,
        title: 'Guild Create',
        fields: [
          {
            name: 'Server Name',
            value: guild.name,
            inline: true
          },
          {
            name: 'Server ID',
            value: guild.id,
            inline: true
          },
          {
            name: 'Server Owner',
            value: guild.owner ? guild.owner.user.tag : 'Unknown',
            inline: true
          },
          {
            name: 'Server Owner ID',
            value: guild.ownerID,
            inline: true
          }
        ],
        thumbnail: {
          url: guild.icon ? guild.iconURL : `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(guild.nameAcronym)}`
        },
        timestamp: new Date()
    }
  })
}
