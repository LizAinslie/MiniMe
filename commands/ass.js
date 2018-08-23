const randomPuppy = require('random-puppy')
const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: │ You can only run this command in a NSFW channel!')
  snekfetch.get(`https://botlist.space/api/bots/${client.user.id}/upvotes?ids=true`)
  .set('Authorization', client.config.apis.bls)
  .end((err, res) => {
    if (err) {
      msg.channel.send(':exclamation: │ There was an error running the command. This incident has been reported.')
      client.rollbar.error(`[ass.js] snekfetch error: ${err}`)
    }
    var check = res.body.includes(msg.author.id)
    if (msg.author.id === client.config.ownerID) check = 1
    if (check === 1) {
      randomPuppy('ass').then(url => {
        msg.channel.send({
          embed: {
            author: {
              icon_url: msg.author.displayAvatarURL,
              name: `Ass │ Requested by ${msg.author.username}#${msg.author.discriminator}`
            },
            color: client.config.color,
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
          url: 'https://botlist.space/view/456926578228723724',
          description: 'This command is available only for upvoters',
          fields: [{
              name: 'Go upvote at',
              value: 'https://botlist.space/view/456926578228723724'
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
  name: 'ass',
  description: 'Provides ass pictures.',
  usage: 'ass',
  fullDesc: 'Provides ass pictures.',
  type: 'nsfw'
}
