const snekfetch = require('snekfetch')

exports.run = (client, msg, args) => {
  const platforms = {
    pc: 'pc',
    xbox: 'xbl',
    ps4: 'psn'
  }
  snekfetch.get(`https://api.fortnitetracker.com/v1/profile/${platforms[args[0]]}/${args[1]}`)
  .set('TRN-Api-Key', client.config.apis.fortnite)
  .end((err, res) => {
    if (err) {
      msg.channel.send(':exclamation: │ Failed to run the command. This incident has been reported.')
      client.rollbar.error(`[fortnitestats.js] snekfetch error: ${err}`)
    }
    const player = res.body
    let values
    for (let stat of player.lifeTimeStats) {
      values.push({
        name: stat.key,
        value: stat.value,
        inline: true
      })
    }
    msg.channel.send({
      embed: {
        author: {
          icon_url: msg.author.displayAvatarURL,
          name: `Fortnite Stats │ Requested By ${msg.author.username}#${msg.author.discriminator}`
        },
        color: client.config.color,
        title: `${player.epicUserHandle}'s ${player.platformNameLong} Fortnite account`,
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Status: 200'
        },
        timestamp: new Date(),
        fields: values
      }
    })
  }).catch(err => {
    msg.channel.send(':exclamation: │ Failed to retrieve stats for that user!')
    client.rollbar.error(`[fortnitestats.js] snekfetch error: ${err}`)
  })
}

exports.help = {
  name: 'fortnitestats',
  description: 'Retrieves a user\'s Fortnite stats',
  usage: 'fortnitestats <pc|xbox|ps4> <epicNickname>',
  fullDesc: 'Retrieves a user\'s Fortnite stats',
  type: 'util',
  status: 1
}
