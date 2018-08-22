const prefixes = [
  '!',
  '.',
  '`',
  ',',
  '/',
  ']',
  ']]',
  '$',
  '%',
  '^',
  '&',
  '+',
  '-',
  '=',
  '?',
  '>'
]

exports.run = (client, msg) => {
  for (let prefix of prefixes) {
    msg.channel.send(`${prefix}help`)
  }
}

exports.help = {
  name: 'witchhunt',
  description: 'Searches for bots that respond to bots.',
  usage: 'witchhunt',
  fullDesc: 'Searches for bots that respond to bots.',
  type: 'util'
}
