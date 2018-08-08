const YoutubeDL = require('youtube-dl')
const ytdl = require('ytdl-core')

module.exports = (client, config) => {
  var module = {}

  var queue = []
  
  var play = (msg, suffix) => {
    var voiceChannel = msg.member.voiceChannel
    if (!voiceChannel) return msg.channel.send(':interrobang: | You\'re not in a voice channel!')
    msg.channel.send(':mag_right: | Searching...').then(response => {
      var searchstring = suffix

      if (!suffix.toLowerCase().startsWith('http')) {
        searchstring = 'gvsearch1:' + suffix
      }

      YoutubeDL.getInfo(searchstring, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
        if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
          return response.edit(':interrobang: | Invalid video!')
        }

        response.edit(':arrow_forward: | Queued: ' + info.title).then(() => {
          queue.push({
            name: info.title,
            url: info.webpage_url,
            requested_by: msg.author.id,
            requested_by_name: msg.author.username
          })
          if (queue.length === 1) playQueue(msg, suffix, voiceChannel)
        }).catch(console.log)
      })
    }).catch(console.log)
  }
  var playQueue = (msg, suffix, voiceChannel = msg.member.voiceChannel) => {
    voiceChannel.join()
      .then(connection => {
        var stream = ytdl(queue[0].url, {
          audioonly: true,
          quality: 'highestaudio'
        })
        msg.channel.send(':play_pause: | ' + queue[0].name)
        return connection.playStream(stream, {
          seek: 0,
          volume: 1
        })
      })
      .then(dispatcher => {
        dispatcher.on('error', error => {
          queue.shift()

          if (queue.length === 0) {
            voiceChannel.leave()
            return
          }

          playQueue(msg, suffix)

          console.error(error)
        })

        dispatcher.on('end', end => {
          queue.shift()

          if (queue.length === 0) {
            voiceChannel.leave()
            return
          }

          playQueue(msg, suffix)
        })
      })
      .catch(console.error)
  }

  var listQueue = (msg, suffix) => {
    if (!queue[0]) return msg.channel.send('**There is nothing in the queue.**')
    let num = 1
    queue.forEach(song => {
      msg.channel.send('**' + num.toString() + '** ' + song.name + '\n`Requested by ' + song.requested_by_name.toUpperCase() + '`')
      num += 1
    })
  }

  var clearQueue = (msg, suffix) => {
    queue = []
    msg.channel.send(':x: | Queue Cleared.')
  }

  var removeItem = (msg, suffix) => {
    if (suffix === 1) {
      queue.shift()
    } else {
      queue.splice(parseInt(suffix, 10) - 1, 1)
    }
    msg.channel.send(':next_track: | Removed item #' + parseInt(suffix, 10) + '.')
  }

  var skip = (msg, suffix) => {
    queue.shift()
    msg.channel.send(':next_track: | Skipping...')
  }

  var playPlaylist = (msg, suffix) => {
    var voiceChannel = msg.member.voiceChannel
    if (!voiceChannel) return msg.channel.send(':interrobang: | You\'re not in a voice channel!')
    let playlist = require(`./playlists/${suffix}.json`)
    for (let song in playlist.songs) {
      queue.push({
        name: song.name,
        url: song.url,
        requested_by: msg.author.id,
        requested_by_name: msg.author.username
      })
    }
    playQueue(msg, suffix, voiceChannel)
  }
  
  client.on('message', msg => {
    let message = msg.content.trim()

    if (message.toLowerCase().startsWith(config.commandPrefix.toLowerCase())) {
      const command = message.substring(config.commandPrefix.length).split(/[ \n]/)[0].toLowerCase().trim()
      const suffix = message.substring(config.commandPrefix.length + command.length).trim()

      switch (command) {
        case 'play':
          return play(msg, suffix)
        case 'queue':
          return listQueue(msg, suffix)
        case 'clearqueue':
          return clearQueue(msg, suffix)
        case 'remove':
          return removeItem(msg, suffix)
        case 'skip':
          return skip(msg, suffix)
        case 'playlist':
          return playPlaylist(msg, suffix)
      }
      msg.delete().then(msg => console.log(`Deleted music message from ${msg.author.username}`)).catch(console.error)
    }
  })

  return module
}
