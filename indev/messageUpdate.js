const Discord = require('discord.js')

module.exports = (client, oldMsg, newMsg) => {
  if (!client.guildSettings.has(newMsg.guild.id)) return
  if (!client.guildSettings.getProp(newMsg.guild.id, 'doLogs')) return

  const logChannel = newMsg.guild.channels.get(client.guildSettings.getProp(newMsg.guild.id, 'logChannel'))
  const embed = new Discord.RichEmbed()
  .setTitle('Message Edit')
  .setColor(client.config.color)
  .addField('Old Message', oldMsg.content)
  .addField('New Message', newMsg.content)
  .addField('Channel', newMsg.channel.toString())
  .setThumbnail(newMsg.author.displayAvatarURL)
  logChannel.send(embed)
}
