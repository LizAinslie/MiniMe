const emojis = [
  'streaming <:streaming:313956277132853248>'
]

exports.run = (client, msg) => {
  for (let emoji in emojis) {
    msg.channel.send('emoji: <:online:313956277808005120>')
  }
}

exports.help = {
  name: 'testemoji',
  description: 'Tests emojis.',
  usage: 'testemoji',
  fullDesc: 'Tests emojis.',
  type: 'dev'
}
