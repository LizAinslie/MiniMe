/* Eris Fixed */

let rps = ['**:moyai: rock**', '**:pencil: paper**', '**:scissors: scissors**']
function random () { return `${rps[Math.floor(Math.random() * rps.length)]}!` }
exports.run = (client, msg, args) => {
  let choice = args.join(' ').toLowerCase()
  if (choice === '') return msg.channel.createMessage(':question: │ Please specify either rock, paper or scissors.')
  if (choice !== 'rock' && choice !== 'paper' && choice !== 'scissors') return msg.channel.createMessage(`:question: │ Please specify either rock, paper or scissors. ${choice} isn't one of those :P`)
  msg.channel.createMessage(random())
}

exports.help = {
  name: 'rps',
  description: 'Play rock-paper-scissors with the bot.',
  usage: 'rps [rock|paper|scissors]',
  fullDesc: 'Play rock-paper-scissors with the bot.',
  type: 'fun',
  status: 2
}
