/* Eris Fixed */

exports.run = (client, msg, args) => {
  msg.channel.createMessage(':ping_pong: │ Pinging...').then((m) => {
		m.edit(':ping_pong: │ Pong! `' + (Date.now() - m.timestamp) + 'ms`')
	})
}

exports.help = {
  name: 'ping',
  description: 'Ping the bot.',
  usage: 'ping',
  fullDesc: "Ping the bot. It should respond with 'pong!'.",
  type: 'util',
  status: 2,
  aliases: ['pong']
}
