exports.run = (client, msg) => {
    if (!msg.member.voiceState.channelID) return msg.channel.createMessage(':no_entry_sign: │ You must be in a voice channel in order to use this command.');
	if (!client.voiceConnections.has(msg.channel.guild.id)) return msg.channel.createMessage(':no_entry_sign: │ I am not playing any music within that channel.');
	if (client.voiceConnections.get(msg.channel.guild.id).channelId !== msg.member.voiceState.channelID) return msg.channel.createMessage(':no_entry_sign: │ I am already playing music within a different voice channel. Please join that channel instead.');
	if (!client.queue.has(msg.channel.guild.id)) return msg.channel.createMessage(':exclamation: │ I am not playing any music in that voice channel.');
	const queue = client.queue.get(msg.channel.guild.id);
	if (queue.paused) return msg.channel.createMessage(':exclamation: │ The current song is already paused.');
	queue.pause(true);
}

exports.help = {
	name: 'pause',
	description: 'Pause the music.',
	usage: 'pause',
	fullDesc: 'Pause the music.',
	type: 'vc',
	status: 2,
	aliases: []
}