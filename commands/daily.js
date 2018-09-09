const updateBalance = require('../util/updateBalance.js')

const cooldown = new Set()
exports.run = (client, msg) => {
  if (cooldown.has(msg.author.id)) {
    msg.channel.createMessage(':stopwatch: │ You can only do this once every day.')
  } else {
    // the user can type the command ... your command code goes here :)
    updateBalance(client.r, msg.author.id, 250).then(balance => {
      msg.channel.createMessage(':dollar: │ You got your daily reward of **<:coins:482589075459801098>250 Minicoins**')
    }).catch((error) => {
      msg.channel.createMessage(':exclamation: │ Failed to run the command! This incident has been reported.')
			client.rollbar.error(`Failed to update balance of user with id ${msg.author.id}: ${error}`)
		})
    // Adds the user to the set so that they can't talk for a day
    cooldown.add(msg.author.id)
    setTimeout(() => {
      // Removes the user from the set after a day
      cooldown.delete(msg.author.id)
    }, 60 * 60 * 24 * 1000)
  }
}

exports.help = {
  name: 'daily',
  description: 'Collect your daily money.',
  usage: 'daily',
  fullDesc: 'Collect your daily money.',
  type: 'eco',
  status: 2
}
