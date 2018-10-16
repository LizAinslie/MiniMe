const formatDuration = require('../util/formatDuration')
const config = require('../config.json')

class VoiceConnection {
	constructor (bot, player, channel, results) {
		this.bot = bot
		this.player = player
		this.queue = []
		this.channel = channel
		this.volume = 100
		this.queueSong(results)
		this.playNext()
		this.player.on('end', this.songEnd.bind(this))
	}

	playNext () {
		const song = this.queue[0]
		this.player.play(song.info.uri)
		this.channel.createMessage({
			embed: {
				title: 'Now Playing',
				color: 16098851,
				fields: [
				    {
				        name: 'URL',
				        value: '[' + song.info.title + '](https://youtube.com/watch?v=' + song.info.identifier + ')'
				    },
				    {
				        name: 'Duration',
				        value: formatDuration(song.info.length)
				    },
				    {
				        name: 'Stream',
				        value: song.info.isStream ? 'Yes' : 'No'
				    }
				],
				thumbnail: {
					url: 'https://img.youtube.com/vi/' + song.info.identifier + '/mqdefault.jpg'
				}
			}
		})
	}

	queueSong (results) {
		this.queue.push(results[0])
		this.channel.createMessage({
			embed: {
				title: 'Added to Queue',
				color: 16098851,
				fields: [
				    {
				        name: 'Name',
				        value: results[0].info.title
				    },
				    {
				        name: 'Author',
				        value: results[0].info.author
				    },
				    {
				        name: 'Duration',
				        value: formatDuration(results[0].info.length)
				    },
				    {
				        name: 'Position in Queue',
				        value: this.queue.length
				    }
				]
			}
		})
	}

	songEnd () {
		this.queue.splice(0, 1)
		if (this.queue.length > 0) return this.playNext()
		this.player.stop()
		this.bot.leaveVoiceChannel(this.player.channelId)
		this.sendQueueEnd()
	}

	sendQueueEnd () {
		this.channel.createMessage(':eject: │ The queue has ended. If you enjoyed the music, please consider donating to keep music alive. <' + config.links.donate + '>')
	}

	clear () {
		this.queue = []
		this.player.stop()
	}

	pause (bool) {
		this.player.pause(bool)
	}

	skip () {
		this.player.stop()
	}

	setVolume (volume) {
		this.player.setVolume(volume)
		this.volume = volume
	}

	get paused () {
		return this.player.paused
	}

	get nowPlaying () {
		return this.queue[0]
	}

	get position () {
		return this.player.state.position
	}
}

module.exports = VoiceConnection
