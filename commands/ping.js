exports.run = (client, message, args) => {
    message.channel.send(`:ping_pong: | Pong!`).catch(console.error)
}

exports.help = {
  name: 'ping',
  description: 'Ping the bot.',
  usage: 'ping',
  fullDesc: "Ping the bot. It should respond with 'pong!'."
}

exports.type = 'text'
