exports.run = (client, message, args) => {
  if (message.member.voiceState.channelID) {
    const voiceChannel = message.channel.guild.channels.get(message.member.voiceState.channelID)
    voiceChannel.leave()
    message.channel.createMessage(':outbox_tray: │ Left Voice Channel.')
  }
}

exports.help = {
  name: 'leave',
  description: 'Have the bot leave a voice channel.',
  usage: 'leave',
  fullDesc: 'Have the bot leave a voice channel.',
  type: 'vc',
  status: 2,
  aliases: []
}
