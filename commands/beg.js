const cooldown = new Set()
exports.run = (client, msg) => {
  if (cooldown.has(msg.author.id)) {
    msg.channel.send(':stopwatch: │ Wait 30 Seconds before getting begging again, you needy pleb.')
  } else {
    // the user can type the command ... your command code goes here :)
    const amt = Math.floor(Math.random() * 3) + 1
    const key = `${msg.author.id}-balance`
    if (!client.userData.has(key)) {
      client.userData.set(key, amt)
    } else {
      client.userData.set(key, parseInt(client.userData.get(key), 10) + amt)
    }
    msg.channel.send(':dollar: │ You begged and got **<:coins:482589075459801098>' + amt.toString() + ' Minicoins**.')
    // Adds the user to the set so that they can't talk for 30 seconds
    cooldown.add(msg.author.id)
    setTimeout(() => {
      // Removes the user from the set after 30 seconds
      cooldown.delete(msg.author.id)
    }, 30000)
  }
}

exports.help = {
  name: 'beg',
  description: 'Beg for money.',
  usage: 'beg',
  fullDesc: 'Beg for money.',
  type: 'eco',
  status: 2
}
