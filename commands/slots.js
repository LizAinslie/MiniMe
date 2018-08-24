const xorshift = require('xorshift')

exports.run = (client, message) => {
  let reel = [
    ':custard:',
    ':candy:',
    ':cake:',
    ':icecream:',
    ':lollipop:',
    ':chocolate_bar:',
    // ':moneybag:',
    ':shaved_ice:',
    ':doughnut:',
    ':cookie:',
    ':ice_cream:'
  ]

  let reels = []
  for (let i = 0; i < 3; i++) {
    reels.push(reel[Math.floor(xorshift.random() * reel.length)])
  }
  let amt = 0
  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    amt = 100
  } else if (reels[0] === reels[2]) {
    amt = 50
  }
  const key = `${message.author.id}-balance`
  if (!client.userData.has(key)) {
    client.userData.set(key, amt)
  } else {
    client.userData.set(key, parseInt(client.userData.get(key), 10) + amt)
  }
  message.channel.send({
    embed: {
      color: client.config.color,
      title: 'Slot Machine',
      description: reels.join(' │ '),
      footer: {
        text: reels[0] === reels[1] && reels[1] === reels[2] || reels[0] === reels[2] ? 'Congrats! You won, and <:coins:482589075459801098>' + amt.toString() + ' Minicoins have been added to your account!' : 'Sorry, you lost.'
      }
    }
  }).catch(e => {
    client.rollbar.error(e)
  })
}

exports.help = {
  name: 'slots',
  description: 'Play the slot machine.',
  usage: 'slots',
  fullDesc: 'Play the slot machine.',
  type: 'fun'
}
