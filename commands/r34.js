const randomPuppy = require('random-puppy')
const snekfetch = require('snekfetch')
const getEmbedColor = require('../util/getHighestRoleColor.js')
const Logger = require('../util/Logger.js')

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: │ You can only run this command in a NSFW channel!')
  .get(`https://discordbots.org/api/bots/${client.user.id}/check`)
  .set('Authorization', client.config.apis.botlists.dbl) 
  .query({ userId: msg.author.id })
  .end((err, res) => {
    if (err) {
      msg.channel.send(':exclamation: │ There was an error running the command. This incident has been reported.')
      Logger.error(client, `[r34.js] snekfetch error.`, err)
    }
    var check = res.body.voted
    if (msg.author.id === client.config.ownerID) check = 1
    if (check === 1) {
      randomPuppy('rule34').then(url => {
        msg.channel.send({
          embed: {
            author: {
              icon_url: msg.author.displayAvatarURL,
              name: `Rule34 │ Requested by ${msg.author.username}#${msg.author.discriminator}`
            },
            color: getEmbedColor(msg),
            image: {
              url: url
            },
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: 'Status: 200'
            }
          }
        })
      })
    } else {
      msg.channel.send({
        embed: {
          title: 'Upvoters-Only Command',
          url: 'https://discordbots.org/bot/luki/vote',
          description: 'This command is available only for upvoters',
          fields: [{
              name: 'Go upvote at',
              value: 'https://discordbots.org/bot/luki/vote'
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Status: 403'
          }
        }
      })
    }
  })
}

exports.help = {
  name: 'r34',
  description: 'Provides Rule34 porn.',
  usage: 'r34',
  fullDesc: 'Provides Rule34 porn.',
  type: 'nsfw',
  status: 2
}
