const cooldown = new Set()
exports.run = (client, msg) => {
  if (cooldown.has(msg.author.id)) {
    msg.channel.send(':stopwatch: │ You can only do this once every hour.')
  } else {
    // the user can type the command ... your command code goes here :)
    const key = `${msg.author.id}-balance`
    if (!client.userData.has(key)) {
      client.userData.set(key, 50)
    } else {
      client.userData.set(key, parseInt(client.userData.get(key), 10) + 50)
    }
    msg.channel.send(':dollar: │ You got your hourly reward of **<:coins:482589075459801098>50 Minicoins**')
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
