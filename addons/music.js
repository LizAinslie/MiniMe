const ytdl = require('ytdl-core')

module.exports = (client, config) => {
  const play = (msg, suffix) => {
    const voiceChannel = msg.member.voiceChannel
    voiceChannel.join()
      .then(connection => {
        var stream = ytdl(suffix, {
          audioonly: true,
          quality: 'highestaudio'
        })
        msg.channel.send(':play_pause: | ' + suffix)
        return connection.playStream(stream, {
          seek: 0,
          volume: 1
        })
      })
      .then(dispatcher => {
        dispatcher.on('error', error => {
          voiceChannel.leave
        })
        dispatcher.on('end', end => {
          msg.channel.send(`Finished playing music in ${voiceChannel}`)
        })
      })
      .catch(console.error)
  }
  client.on('message', msg => {
    let message = msg.content.trim()

    if (message.toLowerCase().startsWith(config.prefix.toLowerCase())) {
      const command = message.substring(config.prefix.length).split(/[ \n]/)[0].toLowerCase().trim()
      const suffix = message.substring(config.prefix.length + command.length).trim()

      switch (command) {
        case 'play':
          play(message, suffix)
        default:
      }
    }
  })
}
