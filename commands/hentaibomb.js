const randomPuppy = require('random-puppy');

exports.run = (client, msg) => {
  if (!msg.channel.nsfw) return msg.channel.send(':exclamation: | You can only run this command in a NSFW channel!');
  randomPuppy('hentai').then(url => {
    randomPuppy('hentai').then(url2 => {
      randomPuppy('hentai').then(url3 => {
        randomPuppy('hentai').then(url4 => {
          msg.channel.send(`${url}\n${url2}\n${url3}\n${url4}`)
        })
      })
    })
  })
}

exports.help = {
  name: 'hentaibomb',
  description: 'Provides lots of hentai.',
  usage: 'hentaibomb',
  fullDesc: 'Provides lots of hentai.',
  type: 'nsfw'
}