const randomPuppy = require('random-puppy');

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  snekfetch.get('https://discordbots.org/api/bots/365958655926992896/check')
  .set('Authorization', '') 
  .query({ userId: message.author.id })
  .end((err, res) => {
    console.log(res.body.voted);
    var check = res.body.voted;
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
      const embed = new Discord.RichEmbed()
      .setTitle('Upvoters-only Command!')
      .setColor(client.config.color)
      .setURL('https://discordbots.org/bots/')
      .setTimestamp(new Date())
      .addField('Go Upvote Me at', 'https://discordbots.org/bots')
      .setFooter('Status: 403', client.user.avatarURL)
      msg.channel.send(embed)
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