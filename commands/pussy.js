const randomPuppy = require('random-puppy');
const Discord = require('discord.js')
const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  snekfetch.get(`https://botlist.space/api/bots/${client.user.id}/upvotes?ids=true`)
  .set('Authorization', client.config.apis.bls)
  .end((err, res) => {
    var check = res.body.includes(msg.author.id)
    if (check == 1) {
      randomPuppy('pussy').then(url => {
        msg.channel.send({
          embed: {
            author: {
              icon_url: msg.author.displayAvatarURL,
              text: `Pussy | requested by ${msg.author.username}#${msg.author.discriminator}`
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
  name: 'pussy',
  description: 'Gives you a picture of a pussy.',
  usage: 'pussy',
  fullDesc: 'Gives you a picture of a pussy.',
  type: 'nsfw'
}