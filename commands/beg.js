const cooldown = new Set()
exports.run = (client, msg) => {
  if (cooldown.has(msg.author.id)) {
    msg.channel.send(':stopwatch: │ Wait 30 Seconds before getting begging again, you needy pleb.')
  } else {
    // the user can type the command ... your command code goes here :)
    const key = `${msg.author.id}-balance`
    if (!client.userData.has(key)) {
      client.userData.set(key, 2)
    } else {
      client.userData.set(key, client.userData.get(key) + 2)
    }
    // Adds the user to the set so that they can't talk for a minute
    cooldown.add(msg.author.id)
    setTimeout(() => {
      // Removes the user from the set after a minute
      cooldown.delete(msg.author.id)
    }, 30000)
  }
}

exports.help = {
  name: 'beg',
  description: 'Beg for money.',
  usage: 'beg',
  fullDesc: 'Beg for money.',
  type: 'eco'
}
