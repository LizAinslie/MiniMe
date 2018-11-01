exports.run = (client, msg, args) => {
    if (!msg.member.voiceState.channelID) return msg.channel.createMessage(':no_entry_sign: │ You must be in a voice channel in order to use this command.');
	if (!client.voiceConnections.has(msg.channel.guild.id)) return msg.channel.createMessage(':no_entry_sign: │ I am not playing any music within that channel.');
	if (client.voiceConnections.get(msg.channel.guild.id).channelID !== msg.member.voiceState.channelID) return msg.channel.createMessage(':no_entry_sign: │ I am already playing music within a different voice channel. Please join that channel instead.');
	if (!client.queue.has(msg.channel.guild.id)) return msg.channel.createMessage(':exclamation: │ I am not playing any music in that voice channel.');
	const queue = client.queue.get(msg.channel.guild.id);
	if (args.length > 0) {
		if (isNaN(args[0])) return msg.channel.createMessage(':exclamation: │ The volume must be a valid number.');
		if (Number(args[0]) < 1) return msg.channel.createMessage(':exclamation: │ The volume must be greater than or equal to 1.');
		if (Number(args[0]) > 150) return msg.channel.createMessage(':exclamation: │ The volume must be less than or equal to 150.');
		queue.setVolume(Number(args[0]));
	}
	msg.channel.createMessage({
		embed: {
			title: 'Volume',
			color: 16098851,
			description: '|' + (queue.volume >= 10 ? ('[' + Array(Math.floor(queue.volume / 10)).fill('─').join('') + '](' + client.config.links.supportServer + ')') : '') + Array(Math.floor(15 - (queue.volume / 10))).fill('─').join('') + '| `' + queue.volume + '`'
		}
	});
}

exports.help = {
    name: 'volume',
    description: 'Change the music volume.',
    usage: 'volume <number>',
    fullDesc: 'Change the music volume.',
    type: 'vc',
    status: 2,
    aliases: ['vol']
}