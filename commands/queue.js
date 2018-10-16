exports.run = (client, msg) => {
    if (!msg.member.voiceState.channelID) return msg.channel.createMessage(':no_entry_sign: │ You must be in a voice channel in order to use this command.');
	if (!client.voiceConnections.has(msg.channel.guild.id)) return msg.channel.createMessage(':no_entry_sign: │ I am not playing any music within that channel.');
	if (client.voiceConnections.get(msg.channel.guild.id).channelId !== msg.member.voiceState.channelID) return msg.channel.createMessage(':no_entry_sign: │ I am already playing music within a different voice channel. Please join that channel instead.');
	if (!client.queue.has(msg.channel.guild.id)) return msg.channel.createMessage(':exclamation: │ I am not playing any music in that voice channel.');
	const queue = client.queue.get(msg.channel.guild.id);
	if (queue.queue.length < 2) return msg.channel.createMessage(':exclamation: │ There are no songs in the queue. Add more!');
	msg.channel.createMessage({
		embed: {
			title: 'Queue',
			color: 16098851,
			description: queue.queue.slice(1).map((song) => '`' + (queue.queue.slice(1).indexOf(song) + 1) + '. ' + song.info.title + '`').join('\n')
		}
	});
}

exports.help = {
    name: 'queue',
    description: 'View the music queue for this server.',
    usage: 'queue',
    fullDesc: 'View the music queue for this server.',
    type: 'vc',
    status: 2,
    aliases: ['q']
}