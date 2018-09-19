/* Eris Fixed */

exports.run = (client, msg) => {
  if (Math.random() >= 0.5) {
    msg.channel.createMessage('you flipped **Heads**!')
  } else {
    msg.channel.createMessage('you flipped **Tails**!')
  }
}

exports.help = {
  name: 'coin',
  description: 'Flips a coin.',
  usage: 'coin',
  fullDesc: 'Flips a coin.',
  type: 'fun',
  status: 2,
  aliases: []
}
