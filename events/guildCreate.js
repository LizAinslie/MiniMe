module.exports = (client, guild) => {
  const guildLogChannel = client.guilds.get('497450474711023617').channels.get('499353153536262166')

  guildLogChannel.createMessage({
    embed: {
      color: client.colors.GREEN,
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
            value: client.users.get(guild.ownerID) ? client.users.get(guild.ownerID).username + client.users.get(guild.ownerID).discriminator : 'Unknown',
            inline: true
          },
          {
            name: 'Server Owner ID',
            value: guild.ownerID,
            inline: true
          }
        ],
        thumbnail: {
          url: guild.iconURL
        },
        timestamp: new Date()
    }
  })
}
