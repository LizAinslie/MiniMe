const cooldown = new Set()
exports.run = (client, msg) => {
  if (cooldown.has(msg.author.id)) {
    msg.channel.send(':stopwatch: │ You can only do this once every day.')
  } else {
    // the user can type the command ... your command code goes here :)
    const key = `${msg.author.id}-balance`
    if (!client.userData.has(key)) {
      client.userData.set(key, 250)
    } else {
      client.userData.set(key, parseInt(client.userData.get(key), 10) + 250)
    }
    msg.channel.send(':dollar: │ You got your **$250** daily reward.')
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
  type: 'eco'
}
