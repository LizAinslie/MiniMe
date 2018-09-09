exports.run = (client, message, args) => {
  message.channel.createMessage(`:ping_pong: │ Pong! \`Latency: ${client.ping}ms\``).catch(console.error)
}

exports.help = {
  name: 'ping',
  description: 'Ping the bot.',
  usage: 'ping',
  fullDesc: "Ping the bot. It should respond with 'pong!'.",
  type: 'util',
  status: 2
}
