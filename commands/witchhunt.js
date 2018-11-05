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

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

exports.run = (client, msg) => {
  for (let prefix of prefixes) {
    msg.channel.createMessage(`${prefix}help`)
    msg.channel.createMessage(`${prefix}cmds`)
    msg.channel.createMessage(`${prefix}commands`)
  }
  for (let letter of alphabet.split('')) {
    for (let prefix of prefixes) {
      msg.channel.createMessage(`${letter}${prefix}help`)
      msg.channel.createMessage(`${letter}${prefix}cmds`)
      msg.channel.createMessage(`${letter}${prefix}commands`)
    }
  } 
}

exports.help = {
  name: 'witchhunt',
  description: 'Searches for bots that respond to bots.',
  usage: 'witchhunt',
  fullDesc: 'Searches for bots that respond to bots.',
  type: 'util',
  status: 2,
  aliases: []
}
