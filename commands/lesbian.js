const randomPuppy = require('random-puppy');
const Discord = require('discord.js')

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  snekfetch.get(`https://botlist.space/api/bots/${client.user.id}/upvotes?ids=true`)
  .set('Authorization', client.config.apis.bls)
  .end((err, res) => {
    var check = res.body.includes(msg.author.id)
    if (check == 1) {
      randomPuppy('lesbians').then(url => {
        msg.channel.send({
          embed: {
            author: {
              icon_url: msg.author.displayAvatarURL,
              text: `Lesbian | requested by ${msg.author.username}#${msg.author.discriminator}`
            },
            color: client.config.color,
            image: {
              url: url
            },
            footer: {
              icon_url: client.user.avatarURL,
              text: "Status: 200"
            }
          }
        })
      })
    } else {
      msg.channel.send({
        embed: {
          title: "Upvoters-Only Command",
          url: "https://botlist.space/view/456926578228723724",
          description: "This command is available only for upvoters",
          fields: [{
              name: "Go upvote at",
              value: "https://botlist.space/view/456926578228723724"
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "Status: 403"
          }
        }
      })
    }
  })
}

exports.help = {
  name: 'lesbian',
  description: 'Provides lesbian porn.',
  usage: 'lesbian',
  fullDesc: 'Provides lesbian porn.',
  type: 'nsfw'
}