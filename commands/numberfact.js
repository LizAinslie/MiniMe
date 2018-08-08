const snek = require('snekfetch')

exports.run = (client, msg, args) => {
  snek.get(`http://numbersapi.com/${args.join(' ')}/trivia?default=Boring+number+is+boring.`).then(res => {
    msg.channel.send(res.body.text)
  })
}

exports.help = {
  name: 'numberfact',
  description: 'Gets a number fact.',
  usage: 'numberfact <number>',
  fullDesc: 'Gets a number fact. Must supply a number (No Googol!)',
  type: 'fun'
}