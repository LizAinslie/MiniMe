const snekfetch = require('snekfetch')

exports.run = (client, msg) => {
  snekfetch.get('https://dog.ceo/api/breeds/image/random').then((result) => {
    snekfetch.get(result.body.message).then((result) => {
      msg.channel.send('', {
        name: 'dog.png',
        file: result.body
      });
    }).catch((error) => {
      msg.channel.send(':exclamation: | Failed to run the command.');
    });
  }).catch((error) => {
    msg.channel.send(':exclamation: | Failed to run the command.');
  });
}

exports.help = {
  name: 'randomdog',
  description: 'Gets a random dog picture.',
  usage: 'randomdog',
  fullDesc: 'Gets a random dog picture.',
  type: 'fun'
}