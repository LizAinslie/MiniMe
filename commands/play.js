const snekfetch = require('snekfetch')
const resolveTrack = require('../util/resolveTrack.js')
const getPlayer = require('../util/getPlayer.js')
const Logger = require('../util/Logger.js')
const config = require('../config.json')
const VoiceConnection = require('../structs/VoiceConnection.js')

exports.run = (client, msg, args) => {
	if (args.length < 1) return msg.channel.createMessage(':question: │ You must provide a query.')
	if (!msg.member.voiceState.channelID) return msg.channel.createMessage(':no_entry_sign: │ You must be in a voice channel in order to use this command.')
	if (client.voiceConnections.has(msg.channel.guild.id) && client.voiceConnections.get(msg.channel.guild.id).channelId !== msg.member.voiceState.channelID) return msg.channel.createMessage(':no_entry_sign:   **»**   I am already playing music within a different voice channel. Please join that channel instead.')
	const playlist = args.join(' ').match(/(\?|&)list=([a-zA-Z0-9\-_]+)/)
	const play = () => {
		resolveTrack((/^https?:\/\//.test(args.join(' ')) ? '' : 'ytsearch:') + args.join(' ')).then((results) => {
			if (results.length < 1) return msg.channel.createMessage(':exclamation: │ Unable to find any videos by that query.')
			if (client.voiceConnections.has(msg.channel.guild.id) && client.queue.has(msg.channel.guild.id)) {
				client.queue.get(msg.channel.guild.id).queueSong(results, playlist)
			} else {
				getPlayer(client, msg.member.voiceState.channelID, msg.channel.guild.id).then(player => {
					client.queue.set(msg.channel.guild.id, new VoiceConnection(client, player, msg.channel, results, playlist))
					client.queue.get(msg.channel.guild.id).queueSong(results, playlist)
				}).catch((error) => {
					Logger.error(client, error)
				})
			}
		}).catch((error) => {
			msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
			Logger.error(client, 'Failed to resolve videos', error)
		})
	}
	if (playlist) {
		args = [ 'https://youtube.com/playlist?list=' + playlist[2] ]
		snekfetch.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + playlist[2] + '&key=' + config.api_keys.youtube + '&maxResults=0').then(() => {
			play()
		}).catch((error) => {
			if (error.statusCode === 404) return msg.channel.createMessage(':exclamation: │ Unable to find any playlists by that ID.')
			msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
			Logger.error(client, 'Failed to get YouTube playlist', error)
		})
	} else {
		play()
	}
}

exports.help = {
    name: 'play',
    description: 'Play a song.',
    usage: 'play <song>',
    fullDesc: 'Play a song.',
    type: 'vc',
    status: 2,
    aliases: []
}
