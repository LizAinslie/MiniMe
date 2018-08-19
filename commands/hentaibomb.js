const randomPuppy = require('random-puppy')
const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  snekfetch.get(`https://botlist.space/api/bots/${client.user.id}/upvotes?ids=true`)
  .set('Authorization', client.config.apis.bls)
  .end((err, res) => {
    var check = res.body.includes(msg.author.id)
    if (check == 1) {
      randomPuppy('hentai').then(url => {
        randomPuppy('hentai').then(url2 => {
          randomPuppy('hentai').then(url3 => {
            randomPuppy('hentai').then(url4 => {
              msg.channel.send(`${url}\n${url2}\n${url3}\n${url4}`)
            })
          })
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
  name: 'hentaibomb',
  description: 'Provides lots of hentai.',
  usage: 'hentaibomb',
  fullDesc: 'Provides lots of hentai.',
  type: 'nsfw'
}