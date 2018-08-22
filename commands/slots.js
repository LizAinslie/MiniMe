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
    reels.push(reel[Math.floor(Math.random() * reel.length)])
  }

  message.channel.send({
    embed: {
      color: client.config.color,
      title: 'Slot Machine',
      description: reels.join(' │ '),
      footer: {
        text: reels[0] === reels[1] && reels[1] === reels[2] ? 'Congrats! You won.' : 'Sorry, you lost.'
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
