const cooldown = new Set()
exports.run = (client, msg) => {
  if (cooldown.has(msg.author.id)) {
    msg.channel.send(':stopwatch: │ You can only do this once every week.')
  } else {
    // the user can type the command ... your command code goes here :)
    const key = `${msg.author.id}-balance`
    if (!client.userData.has(key)) {
      client.userData.set(key, 1000)
    } else {
      client.userData.set(key, parseInt(client.userData.get(key), 10) + 1000)
    }
    msg.channel.send(':dollar: │ You got your **$1000** weekly reward.')
    // Adds the user to the set so that they can't talk for a week
    cooldown.add(msg.author.id)
    setTimeout(() => {
      // Removes the user from the set after a week
      cooldown.delete(msg.author.id)
    }, 60 * 60 * 24 * 7 * 1000)
  }
}

exports.help = {
  name: 'weekly',
  description: 'Collect your weekly money.',
  usage: 'weekly',
  fullDesc: 'Collect your weekly money.',
  type: 'eco'
}
