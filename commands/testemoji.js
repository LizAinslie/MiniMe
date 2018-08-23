const emojis = [
  'streaming <:streaming:313956277132853248>'
]

exports.run = (client, msg) => {
  for (let emoji of emojis) {
    msg.channel.send(emoji)
  }
}

exports.help = {
  name: 'testemoji',
  description: 'Tests emojis.',
  usage: 'testemoji',
  fullDesc: 'Tests emojis.',
  type: 'dev'
}
