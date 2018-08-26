const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  snekfetch.get('http://api.icndb.com/jokes/random').then((result) => {
    msg.channel.send(result.body.value.joke)
  }).catch((error) => {
    msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported.')
    client.rollbar.error(`[dadjoke.js] snekfetch error: ${error}`)
  })
}

exports.help = {
  name: 'chucknorris',
  description: 'Tells a joke.',
  usage: 'chucknorris',
  fullDesc: 'Tells a joke. Jokes are all Chuck Norris themed.',
  type: 'fun',
  status: 2
}
