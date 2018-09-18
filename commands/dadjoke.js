const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  snekfetch.get('https://icanhazdadjoke.com/', { headers: { 'accept': 'application/json' } }).then((result) => {
    msg.channel.createMessage(result.body.joke)
  }).catch((error) => {
    msg.channel.createMessage(':exclamation: │ Failed to run the command. This incident has been reported.')
    client.rollbar.error(`[dadjoke.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'dadjoke',
  description: 'Tells a joke.',
  usage: 'dadjoke',
  fullDesc: 'Tells a joke. All jokes are dad jokes.',
  type: 'fun',
  status: 2,
  aliases: []
}
