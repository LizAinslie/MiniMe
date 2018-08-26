  const emojis = [
  'streaming <:streaming:313956277132853248>'
]

exports.run = (client, msg) => {
  if (msg.author.id !== client.config.ownerID) return msg.channel.send(':no_entry_sign: │ Only my developer can use this!')
  for (let emoji of emojis) {
    msg.channel.send(emoji)
  }
}

exports.help = {
  name: 'testemoji',
  description: 'Tests emojis.',
  usage: 'testemoji',
  fullDesc: 'Tests emojis.',
  type: 'dev',
  status: 2
}
