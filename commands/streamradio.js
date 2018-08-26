exports.run = (client, message, args) => {
  if (args.length === 0) return message.channel.send(':interrobang: │ You never supplied a stream URL!')
  const streamURL = args.slice(0, args.length).join(' ')
  if (message.member.voiceChannel) {
    message.member.voiceChannel.join()
    .then(connection => {
      message.channel.send(':play_pause: │ Connected! Playing..')
      connection.playArbitraryInput(`${streamURL}`)
    })
    .catch(console.log)
  } else {
    message.channel.send(':exclamation: │ You are not in a voice channel!')
  }
}

exports.help = {
  name: 'streamradio',
  description: 'Streams radio from an internet source to your voice channel.',
  usage: 'streamradio <url>',
  fullDesc: 'Streams radio from an internet source to your voice channel.',
  type: 'vc',
  status: 2
}
