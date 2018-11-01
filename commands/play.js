const snekfetch = require('snekfetch')
const resolveTrack = require('../util/resolveTrack.js')
const getPlayer = require('../util/getPlayer.js')
const Logger = require('../util/Logger.js')
const config = require('../config.json')
const VoiceConnection = require('../structs/VoiceConnection.js')

exports.run = (client, msg, args) => {
	if (args.length < 1) return msg.channel.createMessage(':question: │ You must provide a query.')
	if (!msg.member.voiceState.channelID) return msg.channel.createMessage(':no_entry_sign: │ You must be in a voice channel in order to use this command.')
	if (client.voiceConnections.has(msg.channel.guild.id) && client.voiceConnections.get(msg.channel.guild.id).channelID !== msg.member.voiceState.channelID) return msg.channel.createMessage(':no_entry_sign:   **»**   I am already playing music within a different voice channel. Please join that channel instead.')
	const play = () => {
		resolveTrack((/^https?:\/\//.test(args.join(' ')) ? '' : 'ytsearch:') + args.join(' ')).then(results => {
			client.rollbar.log(results)
			if (results.length < 1) return msg.channel.createMessage(':exclamation: │ Unable to find any videos by that query.')
			if (client.voiceConnections.has(msg.channel.guild.id) && client.queue.has(msg.channel.guild.id)) {
				client.queue.get(msg.channel.guild.id).queueSong(results.tracks)
			} else {
				getPlayer(client, msg.member.voiceState.channelID, msg.channel.guild.id).then(player => {
					client.queue.set(msg.channel.guild.id, new VoiceConnection(client, player, msg.channel, results.tracks))
				}).catch((error) => {
					Logger.error(client, error)
				})
			}
		}).catch((error) => {
			msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
			Logger.error(client, 'Failed to resolve videos', error)
		})
	}
	play()
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
