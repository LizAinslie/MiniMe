exports.run = (client, message, args) => {
  if (message.member.voiceChannel) {
    message.member.voiceChannel.leave()
    message.reply(':outbox_tray: │ Left Voice Channel.')
  }
}

exports.help = {
  name: 'leave',
  description: 'Have the bot leave a voice channel.',
  usage: 'leave',
  fullDesc: 'Have the bot leave a voice channel.',
  type: 'vc',
  status: 2
}
