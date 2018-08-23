exports.run = (client, msg, args) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: │ You can only run this command in a NSFW channel!')
  const gif = require('giphy-api')(client.config.apis.giphy)
  const search = args.join(' ')
  gif.search({
    q: search
  }, function (err, res) {
    client.rollbar.error(err)
    try {
      var result = Math.floor(Math.random() * Math.min(2, res.data.length))
      msg.channel.sendEmbed({
        embed: {
          image: {
            url: `https://media.giphy.com/media/${res.data[result].id}/giphy.gif` ? `https://media.giphy.com/media/${res.data[result].id}/giphy.gif` : `https://media.giphy.com/media/${res.data[result].id}/giphy.mp4`
          },
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 200 │ Powered by Giphy'
          },
          author: {
            name: `Giphy │ Requested by ${msg.author.username}#${msg.author.discriminator}`
          },
          timestamp: new Date(),
          color: client.config.color,
          fields: [
            {
              name: 'Source',
              value: res.data[result].source ? res.data[result].source : res.data[result].url,
              inline: true
            },
            {
              name: 'Rating',
              value: res.data[result].rating.replace('r', 'R  - Adult content').replace('g', 'G - Safe for all').replace('pg', 'PG - Parental Guidance Suggested') ? res.data[result].rating.replace('r', 'R  - Adult content').replace('g', 'G - Safe for all').replace('pg', 'PG - Parental Guidance Suggested') : 'None',
              inline: false
            }
          ]
        }
      })
    } catch (error) {
      client.rollbar.error('Error on giphy\n' + error)
      msg.channel.sendEmbed({
        title: '¯\\_(ツ)_/¯',
        description: `I couldn't find any gifs matching *${search}*`,
        color: client.config.color
      })
    }
  })
}

exports.help = {
  name: 'giphy',
  description: 'Gets a gif from giphy.',
  usage: 'giphy <searchTerm>',
  fullDesc: 'Gets a gif from giphy. Warning: Some images can be NSFW.',
  type: 'nsfw'
}
