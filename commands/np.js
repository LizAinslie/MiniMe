const formatDuration = require('../util/formatDuration')

exports.run = (client, msg) => {
    if (!msg.member.voiceState.channelID) return msg.channel.createMessage(':no_entry_sign: │ You must be in a voice channel in order to use this command.')
	if (!client.voiceConnections.has(msg.channel.guild.id)) return msg.channel.createMessage(':no_entry_sign: │ I am not playing any music within that channel.')
	if (client.voiceConnections.get(msg.channel.guild.id).channelId !== msg.member.voiceState.channelID) return msg.channel.createMessage(':no_entry_sign: │ I am already playing music within a different voice channel. Please join that channel instead.')
	if (!client.queue.has(msg.channel.guild.id)) return msg.channel.createMessage(':exclamation: │ I am not playing any music in that voice channel.')
	const queue = client.queue.get(msg.channel.guild.id)
	msg.channel.createMessage({
		embed: {
			title: 'Now Playing',
			color: 16098851,
			fields: [
			    {
			        name: 'URL',
			        value: '[' + queue.nowPlaying.info.title + '](' + queue.nowPlaying.info.uri + ')'
			    },
			    {
			        name: 'Author',
			        value: queue.nowPlaying.info.author
			    },
			    {
			        name: 'Duration',
			        value: formatDuration(queue.position) + '/' + formatDuration(queue.nowPlaying.info.length)
			    }
			],
			thumbnail: {
				url: 'https://img.youtube.com/vi/' + queue.nowPlaying.info.identifier + '/mqdefault.jpg'
			}
		}
	})
}

exports.help = {
    name: 'np',
    description: 'Check what song is playing.',
    usage: 'np',
    fullDesc: 'Check what song is playing.',
    type: 'vc',
    status: 2,
    aliases: ['nowplaying']
}
