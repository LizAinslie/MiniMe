const snek = require('snekfetch')

exports.run = (client, msg, args) => {
  snek.get(`http://numbersapi.com/${args[0]}/trivia?default=Boring+number+is+boring.`).then(res => {
    msg.channel.send(res.body.toString())
  }).catch((error) => {
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported.')
    client.rollbar.error(`[numberfact.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'numberfact',
  description: 'Gets a number fact.',
  usage: 'numberfact <number>',
  fullDesc: 'Gets a number fact. Must supply a number (No Googol!)',
  type: 'fun',
  status: 1
}
