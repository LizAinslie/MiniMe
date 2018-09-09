const updateBalance = require('../util/updateBalance.js')

const cooldown = new Set()
exports.run = (client, msg) => {
  if (cooldown.has(msg.author.id)) {
    msg.channel.send(':stopwatch: │ You can only do this once every hour.')
  } else {
    // the user can type the command ... your command code goes here :)
    updateBalance(client.r, msg.author.id, amt).then(balance => {
      msg.channel.send(':dollar: │ You got your hourly reward of **<:coins:482589075459801098>50 Minicoins**')
    }).catch((error) => {
      msg.channel.send(':exclamation: │ Failed to run the command! This incident has been reported.')
			client.rollbar.error(`Failed to update balance of user with id ${msg.author.id}: ${error}`)
		})
    // Adds the user to the set so that they can't talk for an hour
    cooldown.add(msg.author.id)
    setTimeout(() => {
      // Removes the user from the set after an hour
      cooldown.delete(msg.author.id)
    }, 60 * 60 * 1000)
  }
}

exports.help = {
  name: 'hourly',
  description: 'Collect your hourly money.',
  usage: 'hourly',
  fullDesc: 'Collect your hourly money.',
  type: 'eco',
  status: 2
}
